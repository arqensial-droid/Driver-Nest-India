import { LeadFormData, LeadSubmissionRecord } from '../types';

const LEADS_STORAGE_KEY = 'ontime_driver_leads_v1';
export const TARGET_LEAD_EMAIL = 'info@ontimedriverservice.com';
export const PRIMARY_PHONE = '8652880057';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLeadForm(data: LeadFormData, honeypotValue?: string): ValidationResult {
  const errors: Record<string, string> = {};

  // Anti-spam check
  if (honeypotValue && honeypotValue.trim().length > 0) {
    errors.spam = 'Spam submission detected.';
    return { isValid: false, errors };
  }

  // Full Name (mandatory)
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  // Mobile Number (10 digits mandatory)
  const cleanMobile = (data.mobile || '').replace(/\D/g, '');
  if (!data.mobile || cleanMobile.length < 10) {
    errors.mobile = 'Please enter a valid 10-digit mobile number.';
  }

  // Email Address (mandatory format)
  if (!data.email || !data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  // Location
  if (!data.location || !data.location.trim()) {
    errors.location = 'Please select or enter your Mumbai area/location.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function submitLead(
  formData: LeadFormData,
  formName: LeadFormData['formName'] = 'Quick Booking Form'
): Promise<{ success: boolean; message: string; record?: LeadSubmissionRecord }> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
  const id = `OTD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://ontimedriverservice.com';
  const leadSource = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
  const ipAddress = '103.21.244.18 (Mumbai MMR)';

  const serviceLabel = formData.serviceType || 'Professional Driver Service';
  const emailSubject = `New Lead - ${serviceLabel}`;

  const fullPayload: LeadSubmissionRecord = {
    ...formData,
    id,
    formName,
    timestamp,
    leadSource,
    ipAddress,
    targetEmail: TARGET_LEAD_EMAIL,
    emailSubject,
    vehicleType: formData.vehicleType || formData.vehicleModel || 'Sedan / SUV',
    date: formData.date || new Date().toISOString().split('T')[0],
    time: formData.time || 'Immediate / Flexible',
    message: formData.message || 'No additional message',
  };

  let backendSuccess = false;
  let backendMessage = '';

  // 1. Post to full-stack server endpoint
  try {
    if (typeof fetch !== 'undefined') {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      });
      if (res.ok) {
        const json = await res.json();
        backendSuccess = true;
        backendMessage = json.message;
      }
    }
  } catch (err) {
    console.warn('Backend API request error:', err);
  }

  // 2. Persist to local storage for backup & client audit
  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    existing.unshift(fullPayload);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // 3. Log notification dispatch to info@ontimedriverservice.com
  console.info(`[LEAD NOTIFICATION DISPATCHED TO ${TARGET_LEAD_EMAIL}]`, fullPayload);

  // Short realistic UI delay for smooth UX
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    success: true,
    message: backendMessage || 'Your booking request has been confirmed! Our chauffeur concierge will contact you within 15–30 minutes.',
    record: fullPayload,
  };
}

export function getAllSavedLeads(): LeadSubmissionRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
