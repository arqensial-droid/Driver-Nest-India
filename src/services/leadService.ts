import { LeadFormData, LeadSubmissionRecord } from '../types';

const LEADS_STORAGE_KEY = 'ontime_driver_leads_v1';
export const TARGET_LEAD_EMAIL = 'info@ontimedriverservice.com';
export const PRIMARY_PHONE = '8652880057';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Standard Form Validation:
 * Required: Name, Mobile, Location, Service Type
 * Accepts: 10-digit Indian mobile number
 */
export function validateLeadForm(data: LeadFormData, honeypotValue?: string): ValidationResult {
  const errors: Record<string, string> = {};

  // Anti-spam honeypot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    errors.spam = 'Spam submission detected.';
    return { isValid: false, errors };
  }

  // Full Name * (mandatory)
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (minimum 2 characters).';
  }

  // Mobile Number * (10-digit Indian mobile number)
  const digits = (data.mobile || (data as any).phone || '').replace(/\D/g, '');
  let cleanMobile = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    cleanMobile = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    cleanMobile = digits.slice(1);
  }

  if (cleanMobile.length !== 10) {
    errors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
  }

  // Location * (mandatory)
  if (!data.location || !data.location.trim()) {
    errors.location = 'Please select or enter your location in Mumbai MMR.';
  }

  // Service Type * (mandatory)
  if (!data.serviceType || !data.serviceType.trim()) {
    errors.serviceType = 'Please select a driver service type.';
  }

  // Email Address (optional, but validate format if provided)
  if (data.email && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Clean 10-digit phone helper
 */
export function extractClean10DigitPhone(rawPhone: string): string {
  const digits = (rawPhone || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Generate standard WhatsApp message for manual follow-up or fallback
 */
export function getWhatsAppFallbackUrl(data: Partial<LeadFormData>): string {
  const cleanPhone = PRIMARY_PHONE;
  const nameVal = data.name ? ` ${data.name}` : '';
  const locVal = data.location ? ` ${data.location}` : '';
  const servVal = data.serviceType ? ` ${data.serviceType}` : '';
  const message =
    `Hello On Time Driver Service,\n` +
    `I tried submitting a driver requirement on the website.\n\n` +
    `Name:${nameVal}\n` +
    `Location:${locVal}\n` +
    `Service Required:${servVal}`;

  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppSuccessUrl(data: Partial<LeadFormData>, leadId?: string): string {
  const cleanPhone = PRIMARY_PHONE;
  const message =
    `Hello On Time Driver Service, I just submitted driver requirement #${leadId || 'NEW'}:\n\n` +
    `• Name: ${data.name || ''}\n` +
    `• Mobile: ${data.mobile || (data as any).phone || ''}\n` +
    `• Location: ${data.location || ''}\n` +
    `• Service: ${data.serviceType || ''}\n` +
    `• Vehicle: ${data.vehicleType || (data as any).vehicle || ''}\n` +
    `• Date & Time: ${data.date || ''} (${data.time || ''})\n\n` +
    `Please expedite driver allocation.`;

  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Centralized Real Lead Submission Function
 * Submits to POST /api/leads with automatic fallback to /api/leads.php for Hostinger shared hosting.
 * NEVER returns fake success. Throws or returns success: false if backend fails.
 */
export async function submitLead(
  formData: LeadFormData,
  formName: LeadFormData['formName'] = 'Instant Driver Booking'
): Promise<{ success: boolean; message: string; record?: LeadSubmissionRecord; error?: string }> {
  const cleanMobile = extractClean10DigitPhone(formData.mobile || (formData as any).phone || '');
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
  const pageUrl = typeof window !== 'undefined' ? window.location.href || window.location.pathname || '/' : '/';
  const sourcePage = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
  const leadSource = formName || 'Instant Driver Booking';
  const vehicleDetails = formData.vehicleType || (formData as any).vehicle || (formData as any).vehicleModel || 'Sedan / SUV';

  const payload = {
    name: formData.name ? formData.name.trim() : '',
    mobileNumber: cleanMobile,
    phone: cleanMobile,
    mobile: cleanMobile,
    email: formData.email && formData.email.trim() ? formData.email.trim() : 'Not provided',
    location: formData.location ? formData.location.trim() : '',
    serviceType: formData.serviceType || 'Personal Driver',
    service_type: formData.serviceType || 'Personal Driver',
    date: formData.date || new Date().toISOString().split('T')[0],
    time: formData.time || 'Immediate / Flexible',
    vehicleDetails,
    vehicle: vehicleDetails,
    vehicleType: vehicleDetails,
    message: formData.message && formData.message.trim() ? formData.message.trim() : 'No additional requirement specified',
    pageUrl,
    sourcePage,
    leadSource,
    formName: leadSource,
    timestamp,
    submittedAt: timestamp,
  };

  console.log('[CONSOLE LOG] [LEAD SUBMISSION INITIATED]', {
    endpoint: '/api/send-lead',
    name: payload.name,
    mobile: payload.mobileNumber,
    service: payload.serviceType,
    location: payload.location,
    formName: payload.formName,
  });

  let responseData: any = null;
  let submissionError: string | null = null;

  // 1. Primary Attempt: POST /api/send-lead
  try {
    const res = await fetch('/api/send-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      responseData = await res.json();
      console.log('[CONSOLE LOG] [LEAD SUBMISSION SUCCESS]', responseData);
    } else if (res.status === 404 || !isJson) {
      // Fallback 1: Try /api/leads if server route alias
      console.warn('[CONSOLE LOG] [LEAD RETRY] /api/send-lead returned 404/non-json. Trying /api/leads...');
      const fallbackRes = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const fallbackJson = fallbackRes.headers.get('content-type')?.includes('application/json');
      if (fallbackRes.ok && fallbackJson) {
        responseData = await fallbackRes.json();
        console.log('[CONSOLE LOG] [LEAD SUBMISSION SUCCESS via /api/leads]', responseData);
      } else {
        // Fallback 2: Try /api/leads.php for Hostinger Apache/PHP hosting
        console.warn('[CONSOLE LOG] [LEAD RETRY] Trying Hostinger /api/leads.php fallback...');
        const phpRes = await fetch('/api/leads.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (phpRes.ok) {
          responseData = await phpRes.json();
          console.log('[CONSOLE LOG] [LEAD SUBMISSION SUCCESS via /api/leads.php]', responseData);
        } else {
          const errorText = await phpRes.text();
          submissionError = `Submission failed (${phpRes.status}): ${errorText}`;
        }
      }
    } else {
      const errorJson = isJson ? await res.json() : await res.text();
      submissionError = errorJson.error || `Server responded with status ${res.status}`;
    }
  } catch (netErr: any) {
    console.error('[CONSOLE LOG] [LEAD NETWORK ERROR]', netErr);
    // Secondary PHP endpoint attempt
    try {
      const phpRes = await fetch('/api/leads.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (phpRes.ok) {
        responseData = await phpRes.json();
        console.log('[CONSOLE LOG] [LEAD RECOVERED via PHP]', responseData);
      } else {
        submissionError = netErr.message || 'Network connection failed.';
      }
    } catch {
      submissionError = netErr.message || 'Network connection failed. Please check your internet.';
    }
  }

  // 2. Validate Real Backend Response
  if (!responseData || !responseData.success) {
    const finalErrorMessage = submissionError || 'We could not submit your request right now. Please call 8652880057 or contact us on WhatsApp.';
    console.error('[CONSOLE LOG] [LEAD SUBMISSION FAILED - REAL ERROR]', finalErrorMessage);
    return {
      success: false,
      message: finalErrorMessage,
      error: finalErrorMessage,
    };
  }

  // 3. Local Client Storage Backup (Auditable trail)
  const fullRecord: LeadSubmissionRecord = {
    ...formData,
    id: responseData.leadId || `OTD-${Date.now().toString(36).toUpperCase()}`,
    mobile: cleanMobile,
    formName: leadSource,
    timestamp,
    leadSource,
    ipAddress: 'Client Verified',
    targetEmail: TARGET_LEAD_EMAIL,
    emailSubject: 'New Driver Booking Lead - On Time Driver Service',
    vehicleType: vehicleDetails,
    date: payload.date,
    time: payload.time,
    message: payload.message,
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    existing.unshift(fullRecord);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
  } catch (err) {
    console.warn('[CONSOLE LOG] LocalStorage backup error:', err);
  }

  return {
    success: true,
    message: responseData.message || 'Thank you for your enquiry. Our team will contact you shortly.',
    record: fullRecord,
  };
}

export function getAllSavedLeads(): LeadSubmissionRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
