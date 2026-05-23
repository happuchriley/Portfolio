import cv from '../data/cv.json';

/** Contact details shared by Contact section and cv.json (single source of truth). */
export const CONTACT_EMAILS = [cv.email, cv.emailAlt].filter(Boolean);

export const PHONE_DISPLAY = cv.phone;

/** E.164 for tel: and WhatsApp links */
export const PHONE_TEL = (() => {
  const digits = cv.phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return `+233${digits.slice(1)}`;
  if (digits.startsWith('233')) return `+${digits}`;
  return `+${digits}`;
})();

export const WHATSAPP_E164 = PHONE_TEL.replace(/^\+/, '');
