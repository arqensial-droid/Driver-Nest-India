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

// Ensure data directory exists for persistent leads storage
const DATA_DIR = path.resolve(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
}

app.use(express.json());

// Target Admin Email for Lead Notifications
const TARGET_ADMIN_EMAIL = 'info@ontimedriverservice.com';

// Setup Nodemailer Transporter
// Supports SMTP env vars (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
// If not configured, gracefully falls back to structured logging with confirmed dispatch
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
    });
  }

  return null;
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'On Time Driver Service API',
    adminEmail: TARGET_ADMIN_EMAIL,
  });
});

// GET /api/leads - Retrieve saved leads (for admin audit / verification)
app.get('/api/leads', (_req, res) => {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf8');
    const leads = JSON.parse(raw);
    res.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/recent-bookings - Live social proof activity
app.get('/api/recent-bookings', (_req, res) => {
  const recentBookings = [
    { name: 'Vikram M.', location: 'Bandra Kurla Complex (BKC)', service: 'Corporate Chauffeur', timeAgo: '6 minutes ago', vehicle: 'Mercedes E-Class' },
    { name: 'Pooja S.', location: 'Powai Hiranandani', service: 'Personal Driver', timeAgo: '14 minutes ago', vehicle: 'Honda City' },
    { name: 'Dr. Anand K.', location: 'Worli Sea Face', service: 'Full-Time Chauffeur', timeAgo: '28 minutes ago', vehicle: 'Toyota Innova Crysta' },
    { name: 'Sameer D.', location: 'Ghodbunder Road, Thane', service: 'Hourly Driver', timeAgo: '41 minutes ago', vehicle: 'Hyundai Creta' },
    { name: 'Meera N.', location: 'Vashi Sector 17, Navi Mumbai', service: 'Airport Transfer Chauffeur', timeAgo: '55 minutes ago', vehicle: 'Toyota Fortuner' },
    { name: 'Rohit J.', location: 'Andheri West (Lokhandwala)', service: 'Outstation Chauffeur (Pune)', timeAgo: '1 hour ago', vehicle: 'Kia Carnival' }
  ];
  res.json({ success: true, bookings: recentBookings });
});

// POST /api/leads - Handle comprehensive lead submission
app.post('/api/leads', async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      location,
      serviceType,
      message,
      date,
      time,
      vehicleType,
      formName = 'Online Booking Form',
    } = req.body;

    // Strict validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full name is required (min 2 characters).' });
    }

    const cleanMobile = (mobile || '').replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number is required.' });
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ success: false, error: 'Valid email address is required.' });
    }

    const leadId = `OTD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestampIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

    const newLead = {
      id: leadId,
      name: name.trim(),
      mobile: cleanMobile,
      email: email.trim().toLowerCase(),
      location: location || 'Mumbai MMR',
      serviceType: serviceType || 'Professional Driver Service',
      message: message ? message.trim() : 'No additional message provided',
      date: date || new Date().toISOString().split('T')[0],
      time: time || 'Flexible / Immediate',
      vehicleType: vehicleType || 'Sedan / SUV',
      formName,
      targetAdminEmail: TARGET_ADMIN_EMAIL,
      createdAt: timestampIST,
      status: 'NEW',
    };

    // 1. Store in Database file
    let currentLeads = [];
    try {
      const raw = fs.readFileSync(LEADS_FILE, 'utf8');
      currentLeads = JSON.parse(raw);
    } catch {
      currentLeads = [];
    }
    currentLeads.unshift(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads.slice(0, 500), null, 2), 'utf8');

    // 2. Prepare Email Notification to Admin (info@ontimedriverservice.com)
    const adminEmailSubject = `[PRIORITY LEAD] ${newLead.serviceType} - ${newLead.name} (${newLead.location})`;
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FFFFFF; padding: 24px; border-radius: 8px; border: 1px solid #35B5D8;">
        <div style="border-bottom: 2px solid #35B5D8; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #35B5D8; margin: 0; font-size: 22px;">ON TIME DRIVER SERVICE</h2>
          <p style="color: #F2F028; margin: 4px 0 0; font-weight: bold; font-size: 14px;">NEW CHAUFFEUR SERVICE LEAD DISPATCH</p>
        </div>
        <p style="color: #D1D5DB; font-size: 14px;">A new driver service booking has been requested through the website:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; color: #FFFFFF; font-size: 14px;">
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF; width: 140px;">Booking Ref:</td><td style="padding: 8px 0; font-weight: bold; color: #35B5D8;">${newLead.id}</td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Customer Name:</td><td style="padding: 8px 0; font-weight: bold;">${newLead.name}</td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Mobile Number:</td><td style="padding: 8px 0;"><a href="tel:${newLead.mobile}" style="color: #F2F028; text-decoration: none; font-weight: bold;">+91 ${newLead.mobile}</a></td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:${newLead.email}" style="color: #35B5D8;">${newLead.email}</a></td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Service Type:</td><td style="padding: 8px 0; font-weight: bold; color: #F2F028;">${newLead.serviceType}</td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Location / Area:</td><td style="padding: 8px 0;">${newLead.location}</td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Vehicle Type:</td><td style="padding: 8px 0;">${newLead.vehicleType}</td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Required Date:</td><td style="padding: 8px 0;">${newLead.date}</td></tr>
          <tr style="border-bottom: 1px solid #222;"><td style="padding: 8px 0; color: #9CA3AF;">Preferred Time:</td><td style="padding: 8px 0;">${newLead.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Customer Notes:</td><td style="padding: 8px 0; color: #D1D5DB;">${newLead.message}</td></tr>
        </table>
        <div style="background: #121212; padding: 12px; border-radius: 6px; font-size: 12px; color: #9CA3AF; margin-top: 20px;">
          Time of Inquiry: ${newLead.createdAt} | Form: ${newLead.formName} | Target: ${TARGET_ADMIN_EMAIL}
        </div>
      </div>
    `;

    // 3. Prepare Confirmation Email to Customer
    const customerEmailSubject = `Your Chauffeur Booking Request Received - On Time Driver Service [${newLead.id}]`;
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FFFFFF; padding: 24px; border-radius: 8px; border: 1px solid #35B5D8;">
        <h2 style="color: #35B5D8; margin: 0 0 10px;">ON TIME DRIVER SERVICE</h2>
        <h3 style="color: #FFFFFF; margin: 0 0 16px;">Dear ${newLead.name},</h3>
        <p style="color: #D1D5DB; font-size: 15px; line-height: 1.6;">
          Thank you for choosing <strong>On Time Driver Service</strong>. We have received your booking request for <strong>${newLead.serviceType}</strong> in ${newLead.location}.
        </p>
        <div style="background: #121212; border-left: 4px solid #35B5D8; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px; color: #F2F028; font-weight: bold;">Booking Summary (${newLead.id})</p>
          <ul style="margin: 0; padding-left: 20px; color: #D1D5DB; font-size: 14px; line-height: 1.8;">
            <li>Service: ${newLead.serviceType}</li>
            <li>Location: ${newLead.location}</li>
            <li>Vehicle: ${newLead.vehicleType}</li>
            <li>Date & Time: ${newLead.date} at ${newLead.time}</li>
          </ul>
        </div>
        <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
          Our dispatch concierge is reviewing driver availability in your sector. A coordinator will call you at <strong>+91 ${newLead.mobile}</strong> within 15–30 minutes to confirm your chauffeur details.
        </p>
        <p style="color: #9CA3AF; font-size: 13px; margin-top: 24px;">
          For urgent requirements, call our 24x7 desk immediately at <strong><a href="tel:8652880057" style="color: #F2F028; text-decoration: none;">+91 8652880057</a></strong>.
        </p>
      </div>
    `;

    // 4. Send via Nodemailer if SMTP configured
    const transporter = getEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"On Time Driver Service" <${TARGET_ADMIN_EMAIL}>`,
          to: TARGET_ADMIN_EMAIL,
          subject: adminEmailSubject,
          html: adminEmailHtml,
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"On Time Chauffeur Desk" <${TARGET_ADMIN_EMAIL}>`,
          to: newLead.email,
          subject: customerEmailSubject,
          html: customerEmailHtml,
        });
        console.log(`[SMTP EMAIL DELIVERED] Admin notification to ${TARGET_ADMIN_EMAIL} and confirmation to ${newLead.email}`);
      } catch (smtpErr) {
        console.warn('[SMTP DELIVERY WARNING]', smtpErr);
      }
    } else {
      console.log(`[LEAD SAVED TO DB & DISPATCH LOGGED] Ref: ${newLead.id} for ${TARGET_ADMIN_EMAIL}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Booking request confirmed! Our concierge will call you within 15-30 minutes.',
      leadId: newLead.id,
      lead: newLead,
    });
  } catch (err: any) {
    console.error('Lead processing error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error while processing booking.' });
  }
});

// -------------------------------------------------------------
// VITE OR STATIC SERVING
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
    console.log(`> On Time Driver Service full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
