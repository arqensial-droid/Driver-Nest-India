import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Robust CORS Middleware - Supports all domains & avoids preflight issues
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// JSON and URL-encoded body parser
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Persistent leads storage setup
const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Business Email Configuration
const TARGET_ADMIN_EMAIL = process.env.LEAD_RECEIVER_EMAIL || 'info@ontimedriverservice.com';
const PRIMARY_PHONE = '8652880057';

// Nodemailer SMTP Transporter
function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return null;
}

// Send email via Resend API
async function sendViaResend(to: string, subject: string, html: string, text?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const fromEmail = process.env.SMTP_FROM || 'On Time Driver Service <onboarding@resend.dev>';
  const payload: any = {
    from: fromEmail,
    to: [to],
    subject,
    html,
  };
  if (text) {
    payload.text = text;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Resend API error: ${res.status} ${errorData}`);
  }

  return await res.json();
}

/**
 * Dispatch Email with Automatic Retry Logic (Resend & SMTP)
 */
async function dispatchLeadEmailWithRetry(
  lead: any,
  subject: string,
  html: string,
  text: string,
  maxRetries = 3
): Promise<{ success: boolean; method: string; error?: string }> {
  let attempt = 0;
  let lastError = '';

  while (attempt < maxRetries) {
    attempt++;
    console.log(`[SERVER LOG] [EMAIL DISPATCH ATTEMPT ${attempt}/${maxRetries}] To: ${TARGET_ADMIN_EMAIL} for Lead ID: ${lead.id}`);

    // Try Resend first
    if (process.env.RESEND_API_KEY) {
      try {
        await sendViaResend(TARGET_ADMIN_EMAIL, subject, html, text);
        console.log(`[SERVER LOG] [EMAIL SENT SUCCESSFULLY] via Resend on attempt ${attempt} for Lead ${lead.id}`);
        return { success: true, method: 'SENT_RESEND' };
      } catch (err: any) {
        lastError = err?.message || String(err);
        console.error(`[SERVER LOG] [RESEND ATTEMPT ${attempt} FAILED]`, lastError);
      }
    }

    // Fall back to SMTP
    const transporter = getEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"On Time Driver Service" <${TARGET_ADMIN_EMAIL}>`,
          to: TARGET_ADMIN_EMAIL,
          subject,
          text,
          html,
        });
        console.log(`[SERVER LOG] [EMAIL SENT SUCCESSFULLY] via SMTP on attempt ${attempt} for Lead ${lead.id}`);
        return { success: true, method: 'SENT_SMTP' };
      } catch (err: any) {
        lastError = err?.message || String(err);
        console.error(`[SERVER LOG] [SMTP ATTEMPT ${attempt} FAILED]`, lastError);
      }
    }

    if (!process.env.RESEND_API_KEY && !transporter) {
      console.warn(`[SERVER LOG] [EMAIL CONFIG MISSING] Neither RESEND_API_KEY nor SMTP credentials configured. Lead ${lead.id} stored in database.`);
      return { success: false, method: 'SAVED_NO_EMAIL_CONFIG', error: 'No active email provider configured' };
    }

    // Delay before next retry if attempts remain
    if (attempt < maxRetries) {
      const delayMs = attempt * 1500;
      console.log(`[SERVER LOG] Waiting ${delayMs}ms before retry...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  return { success: false, method: `FAILED_AFTER_${maxRetries}_ATTEMPTS`, error: lastError };
}

// -------------------------------------------------------------
// CENTRAL LEAD SUBMISSION HANDLER (Used by /api/send-lead and /api/leads)
// -------------------------------------------------------------
async function handleLeadSubmission(req: express.Request, res: express.Response) {
  const requestStartTime = Date.now();
  console.log(`[SERVER LOG] [LEAD RECEIVED] Source: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} | URL: ${req.originalUrl}`);

  try {
    const {
      name,
      mobileNumber,
      phone,
      mobile,
      email,
      location,
      serviceType,
      service_type,
      date,
      time,
      vehicle,
      vehicleType,
      vehicleDetails,
      message,
      sourcePage = '/',
      pageUrl,
      formName = 'Website Booking Form',
      leadSource,
      submittedAt,
    } = req.body;

    // 1. INPUT VALIDATION
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      console.warn('[SERVER LOG] [VALIDATION FAILED] Name missing or too short:', name);
      return res.status(400).json({
        success: false,
        error: 'Please enter your full name (minimum 2 characters).',
      });
    }

    const rawPhone = mobileNumber || mobile || phone || '';
    const digitsOnly = String(rawPhone).replace(/\D/g, '');

    let cleanPhone = digitsOnly;
    if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      cleanPhone = digitsOnly.slice(2);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
      cleanPhone = digitsOnly.slice(1);
    }

    if (cleanPhone.length < 10) {
      console.warn('[SERVER LOG] [VALIDATION FAILED] Invalid Indian phone number:', rawPhone);
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit Indian mobile number.',
      });
    }

    const resolvedLocation = (location && typeof location === 'string') ? location.trim() : '';
    if (!resolvedLocation) {
      console.warn('[SERVER LOG] [VALIDATION FAILED] Location missing');
      return res.status(400).json({
        success: false,
        error: 'Please select or enter your pickup location.',
      });
    }

    const resolvedServiceType = serviceType || service_type || 'Personal Driver';
    if (!resolvedServiceType || typeof resolvedServiceType !== 'string' || !resolvedServiceType.trim()) {
      console.warn('[SERVER LOG] [VALIDATION FAILED] Service type missing');
      return res.status(400).json({
        success: false,
        error: 'Please select a driver service type.',
      });
    }

    // Validate email if provided
    let cleanEmail = 'Not provided';
    if (email && typeof email === 'string' && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        console.warn('[SERVER LOG] [VALIDATION FAILED] Invalid email address format:', email);
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.',
        });
      }
      cleanEmail = email.trim().toLowerCase();
    }

    // 2. NORMALIZE & CAPTURE ALL 11 FIELDS
    const leadId = `OTD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestampIST = submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
    const selectedVehicle = vehicleDetails || vehicle || vehicleType || 'Sedan / SUV';
    const effectivePageUrl = pageUrl || sourcePage || '/';
    const effectiveLeadSource = leadSource || formName || 'Quick Booking Widget';

    const newLead = {
      id: leadId,
      name: name.trim(),
      mobileNumber: cleanPhone,
      phone: cleanPhone,
      mobile: cleanPhone,
      email: cleanEmail,
      location: resolvedLocation,
      serviceType: resolvedServiceType.trim(),
      service_type: resolvedServiceType.trim(),
      date: date || new Date().toISOString().split('T')[0],
      time: time || 'Immediate / Flexible',
      vehicleDetails: selectedVehicle,
      vehicle: selectedVehicle,
      message: message && String(message).trim() ? String(message).trim() : 'No additional requirement specified',
      pageUrl: effectivePageUrl,
      sourcePage: effectivePageUrl,
      leadSource: effectiveLeadSource,
      formName: effectiveLeadSource,
      timestamp: timestampIST,
      created_at: new Date().toISOString(),
      email_status: 'PENDING',
    };

    console.log(`[SERVER LOG] [LEAD VALIDATED & CREATED] ID: ${leadId} | Name: ${newLead.name} | Phone: ${newLead.mobileNumber} | Service: ${newLead.serviceType}`);

    // 3. PERSIST LEAD IN DATABASE BEFORE DISPATCH
    let currentLeads = [];
    try {
      const raw = fs.readFileSync(LEADS_FILE, 'utf8');
      currentLeads = JSON.parse(raw);
    } catch {
      currentLeads = [];
    }

    currentLeads.unshift(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads.slice(0, 1000), null, 2), 'utf8');
    console.log(`[SERVER LOG] [DATABASE SAVE SUCCESS] Lead ${leadId} persisted in data/leads.json`);

    // 4. PREPARE EMAIL CONTENT
    // Required exact subject format: "New Driver Booking Lead - On Time Driver Service"
    const emailSubject = 'New Driver Booking Lead - On Time Driver Service';

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #FFFFFF; color: #111827; padding: 28px; border-radius: 12px; border: 1px solid #E5E7EB;">
        <div style="border-bottom: 2px solid #35B6DE; padding-bottom: 16px; margin-bottom: 20px; text-align: center;">
          <img src="https://ontimedriverservice.com/images/logo.png" alt="On Time Driver Service" style="max-height: 55px; width: auto; margin-bottom: 10px;" />
          <h2 style="color: #111827; margin: 0; font-size: 20px; letter-spacing: 0.5px;">ON TIME DRIVER SERVICE</h2>
          <p style="color: #35B6DE; margin: 4px 0 0; font-weight: bold; font-size: 13px; text-transform: uppercase;">NEW DRIVER BOOKING ENQUIRY RECEIVED</p>
        </div>

        <p style="color: #4B5563; font-size: 14px; margin-bottom: 20px;">
          A customer has submitted a driver booking request on <strong>https://ontimedriverservice.com</strong>:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; width: 160px; font-weight: 600;">Customer Name:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #111827;">${newLead.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Mobile Number:</td>
            <td style="padding: 10px 0;">
              <a href="tel:${newLead.mobileNumber}" style="color: #35B6DE; text-decoration: none; font-weight: bold; font-size: 16px;">
                +91 ${newLead.mobileNumber}
              </a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Email:</td>
            <td style="padding: 10px 0; color: #111827;">${newLead.email || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Location:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 500;">${newLead.location}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Service Type:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: bold;">${newLead.serviceType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Date & Time:</td>
            <td style="padding: 10px 0; color: #111827;">${newLead.date} at ${newLead.time}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Vehicle Details:</td>
            <td style="padding: 10px 0; color: #111827;">${newLead.vehicleDetails}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Message / Details:</td>
            <td style="padding: 10px 0; color: #4B5563; line-height: 1.5;">${newLead.message}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Page URL:</td>
            <td style="padding: 10px 0; color: #35B6DE;">${newLead.pageUrl}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Lead Source:</td>
            <td style="padding: 10px 0; color: #111827;">${newLead.leadSource}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #4B5563; font-weight: 600;">Submission Timestamp:</td>
            <td style="padding: 10px 0; color: #4B5563;">${newLead.timestamp}</td>
          </tr>
        </table>

        <div style="background: #EEF8FC; border: 1px solid #E5E7EB; padding: 16px; border-radius: 8px; margin-top: 24px; font-size: 13px; text-align: center;">
          <a href="https://wa.me/91${newLead.mobileNumber}?text=Hello%20${encodeURIComponent(newLead.name)},%20we%20received%20your%20request%20for%20a%20${encodeURIComponent(newLead.serviceType)}%20at%20On%20Time%20Driver%20Service." style="background: #25D366; color: white; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">
            WhatsApp Customer
          </a>
          <a href="tel:${newLead.mobileNumber}" style="background: #35B6DE; color: white; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; display: inline-block;">
            Call Customer
          </a>
        </div>
      </div>
    `;

    const emailText = `ON TIME DRIVER SERVICE - NEW DRIVER BOOKING LEAD

Customer Name: ${newLead.name}
Mobile Number: +91 ${newLead.mobileNumber}
Email: ${newLead.email}
Location: ${newLead.location}
Service Type: ${newLead.serviceType}
Date: ${newLead.date}
Time: ${newLead.time}
Vehicle Details: ${newLead.vehicleDetails}
Message: ${newLead.message}
Page URL: ${newLead.pageUrl}
Lead Source: ${newLead.leadSource}
Submission Timestamp: ${newLead.timestamp}
Lead ID: ${newLead.id}
`;

    // 5. ATTEMPT EMAIL DISPATCH WITH RETRY
    const dispatchResult = await dispatchLeadEmailWithRetry(newLead, emailSubject, emailHtml, emailText, 3);
    newLead.email_status = dispatchResult.success ? dispatchResult.method : `FAILED: ${dispatchResult.error}`;

    // Update stored lead status
    try {
      currentLeads[0] = newLead;
      fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads.slice(0, 1000), null, 2), 'utf8');
    } catch (saveErr) {
      console.warn('[SERVER LOG] Failed to update lead status in file:', saveErr);
    }

    const duration = Date.now() - requestStartTime;
    console.log(`[SERVER LOG] [LEAD COMPLETED] ID: ${leadId} | Status: ${newLead.email_status} | Duration: ${duration}ms`);

    // 6. RETURN SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      leadId: newLead.id,
      message: 'Thank you for your enquiry. Our team will contact you shortly.',
      lead: {
        id: newLead.id,
        name: newLead.name,
        phone: newLead.mobileNumber,
        mobile: newLead.mobileNumber,
        location: newLead.location,
        serviceType: newLead.serviceType,
      },
      emailStatus: newLead.email_status,
    });
  } catch (err: any) {
    console.error('[SERVER LOG] [LEAD FATAL ERROR]', err);
    return res.status(500).json({
      success: false,
      error: 'We could not submit your request right now. Please call 8652880057 or contact us on WhatsApp.',
    });
  }
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'On Time Driver Service API',
    adminEmail: TARGET_ADMIN_EMAIL,
    phone: PRIMARY_PHONE,
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
  });
});

// GET /api/leads - View saved leads for audit
app.get('/api/leads', (_req, res) => {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf8');
    const leads = JSON.parse(raw);
    res.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Primary Endpoint requested by user: POST /api/send-lead
app.post('/api/send-lead', handleLeadSubmission);

// Alias Endpoint: POST /api/leads
app.post('/api/leads', handleLeadSubmission);

// -------------------------------------------------------------
// VITE DEV SERVER OR PRODUCTION STATIC SERVING
// -------------------------------------------------------------
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> On Time Driver Service active on http://0.0.0.0:${PORT}`);
    console.log(`> Primary Lead Endpoint: POST /api/send-lead`);
    console.log(`> Lead Receiver: ${TARGET_ADMIN_EMAIL}`);
  });
}

startServer();
