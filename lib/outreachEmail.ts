import nodemailer from 'nodemailer';

const SITE_URL = 'https://www.vinayaktechnoplast.com';
const FROM_NAME = 'Vinayak Technoplast';
const FROM_EMAIL = 'crm@vinayaktechnoplast.com';
const SUBJECT = 'Company Profile-Vinayak Technoplast';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const capabilities = [
  ['Plastic Injection Moulding', 'Engineering polymers, reinforced materials and aesthetic components.'],
  ['Metal Components', 'Fabrication, machined parts and insert-based hybrid components.'],
  ['Assemblies', 'Plastic + metal sub-assemblies with built-in quality checks.'],
  ['Tooling &amp; Development', 'In-house and partner tooling for faster product development.'],
];

const reasons = [
  'Consistent, reliable supply at high production volumes with tight tolerances',
  'Cost optimisation built into design and process engineering, not added after',
  'Flexible support for new product development and localisation',
  'Formal quality systems and dependable delivery schedules',
];

function capabilityCell([title, body]: string[], side: 'left' | 'right', last: boolean) {
  const padding = side === 'left' ? `0 12px ${last ? 4 : 22}px 0` : `0 0 ${last ? 4 : 22}px 12px`;
  return `<td width="50%" valign="top" style="padding:${padding}"><div style="border-left:3px solid #e8622c;padding-left:14px"><div style="font-size:15px;font-weight:bold;color:#16283f;padding-bottom:4px">${title}</div><div style="font-size:13px;line-height:1.6;color:#4a5a6a">${body}</div></div></td>`;
}

function buildHtml(name: string) {
  const greeting = name ? `Dear ${escapeHtml(name)},` : 'Dear Sir/Madam,';

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#ffffff">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;color:#000000;font-size:16px;width:600px;max-width:600px">
  <tr><td style="background-color:#16283f;padding:0"><img src="${SITE_URL}/images/email/header.png" alt="Vinayak Technoplast — ISO 9001:2015 Certified" width="600" style="display:block;width:600px;max-width:600px;height:auto;border:0"></td></tr>
  <tr><td><img src="${SITE_URL}/images/bg-image.png" width="600" alt="Vinayak Technoplast manufacturing facility" style="outline:0;display:block;width:600px;max-width:600px;height:auto;border:0"></td></tr>
  <tr><td style="background-color:#16283f;padding:28px 32px">
    <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.35;color:#ffffff;font-weight:bold">A manufacturing partner built around your tolerances, your volumes, and your timelines.</div>
    <div style="font-size:14px;line-height:1.6;color:#b9c2cc;padding-top:10px">Precision plastic components, metal parts and integrated assemblies for OEMs in automotive, construction, off-road and farm equipment.</div>
  </td></tr>
  <tr><td style="padding:32px 32px 8px;font-size:15px;line-height:1.7;color:#1f2937">${greeting}<br><br>Thank you for downloading our company profile.<br><br>As component requirements move toward tighter tolerances and shorter development cycles, sourcing decisions increasingly come down to one question: which supplier can hold quality steady at scale? We'd like to put ourselves forward for that conversation.<br><br>Vinayak Technoplast manufactures plastic, metal and hybrid assembly components for OEMs, and we're building long-term supply relationships in the construction, off-road vehicle and farm equipment segments.</td></tr>
  <tr><td style="padding:24px 32px 8px"><div style="font-size:13px;color:#6b7684;padding-bottom:14px;border-bottom:1px solid #e5e8ec">What we manufacture</div></td></tr>
  <tr><td style="padding:16px 32px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>${capabilityCell(capabilities[0], 'left', false)}${capabilityCell(capabilities[1], 'right', false)}</tr>
      <tr>${capabilityCell(capabilities[2], 'left', true)}${capabilityCell(capabilities[3], 'right', true)}</tr>
    </table>
  </td></tr>
  <tr><td style="padding:16px 32px 0"><div style="font-size:13px;color:#6b7684;padding-bottom:14px;border-bottom:1px solid #e5e8ec">Why OEMs work with us</div></td></tr>
  <tr><td style="padding:16px 32px 8px;font-size:14px;line-height:1.9;color:#1f2937">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${reasons.map((r) => `<tr><td valign="top" width="20" style="color:#e8622c;font-weight:bold">&#10003;</td><td>${r}</td></tr>`).join('')}
    </table>
  </td></tr>
  <tr><td style="padding:20px 32px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f6f8"><tr><td style="padding:18px 20px;font-size:13px;line-height:1.8;color:#4a5a6a"><span style="color:#16283f;font-weight:bold">Our footprint:</span>&nbsp;Two plants at Udyog Nagar Industrial Area, Peeragarhi, Delhi &nbsp;&middot;&nbsp; One plant at Kota, Rajasthan &nbsp;&middot;&nbsp; A new plant at Bahadurgarh, Haryana going operational next quarter</td></tr></table>
  </td></tr>
  <tr><td align="center" style="padding:0 32px 36px">
    <div style="font-size:15px;color:#1f2937;padding-bottom:18px">We'd welcome the chance to understand your current and upcoming component requirements.</div>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="background-color:#e8622c"><a href="${SITE_URL}/contact" style="color:#ffffff;display:inline-block;padding:14px 34px;font-size:15px;font-weight:bold;text-decoration:none" target="_blank">Request a Quote</a></td></tr></table>
  </td></tr>
  <tr><td style="padding:24px 32px 32px;font-size:14px;line-height:1.7;color:#1f2937;border-top:1px solid #e5e8ec">Looking forward to hearing from you.<br><br>Regards,<br><span style="font-weight:bold">Neha Gupta</span><br>Sales Coordinator, Vinayak Technoplast<br><a href="tel:+919999394814" style="color:#16283f;text-decoration:none">+91 99993 94814</a><br><a href="${SITE_URL}/" style="color:#16283f;text-decoration:none">www.vinayaktechnoplast.com</a></td></tr>
  <tr><td style="background-color:#16283f;padding:22px 32px;font-size:11px;line-height:1.8;color:#8a94a0;text-align:center">Vinayak Technoplast &middot; F-6, DSIDC Industrial Complex, Rohtak Road, Near Udyog Nagar Metro Station, Nangloi, New Delhi-110041, India<br><a href="mailto:sales@vinayaktechnoplast.com" style="color:#8a94a0">sales@vinayaktechnoplast.com</a>&nbsp;&middot;&nbsp;<a href="tel:+919311378904" style="color:#8a94a0">+91 93113 78904</a>&nbsp;&middot;&nbsp;<a href="${SITE_URL}/" style="color:#8a94a0">vinayaktechnoplast.com</a><br><br>You're receiving this because you downloaded our company profile on vinayaktechnoplast.com. Reply "remove" to opt out of future emails.</td></tr>
</table>
</body>
</html>`;
}

function buildText(name: string) {
  return `${name ? `Dear ${name},` : 'Dear Sir/Madam,'}

Thank you for downloading our company profile.

As component requirements move toward tighter tolerances and shorter development cycles, sourcing decisions increasingly come down to one question: which supplier can hold quality steady at scale? We'd like to put ourselves forward for that conversation.

Vinayak Technoplast manufactures plastic, metal and hybrid assembly components for OEMs, and we're building long-term supply relationships in the construction, off-road vehicle and farm equipment segments.

What we manufacture
- Plastic Injection Moulding: Engineering polymers, reinforced materials and aesthetic components.
- Metal Components: Fabrication, machined parts and insert-based hybrid components.
- Assemblies: Plastic + metal sub-assemblies with built-in quality checks.
- Tooling & Development: In-house and partner tooling for faster product development.

Why OEMs work with us
${reasons.map((r) => `✓ ${r}`).join('\n')}

Our footprint: Two plants at Udyog Nagar Industrial Area, Peeragarhi, Delhi · One plant at Kota, Rajasthan · A new plant at Bahadurgarh, Haryana going operational next quarter

We'd welcome the chance to understand your current and upcoming component requirements.
Request a Quote: ${SITE_URL}/contact

Looking forward to hearing from you.

Regards,
Neha Gupta
Sales Coordinator, Vinayak Technoplast
+91 99993 94814
www.vinayaktechnoplast.com

Vinayak Technoplast · F-6, DSIDC Industrial Complex, Rohtak Road, Near Udyog Nagar Metro Station, Nangloi, New Delhi-110041, India
sales@vinayaktechnoplast.com · +91 93113 78904

You're receiving this because you downloaded our company profile on vinayaktechnoplast.com. Reply "remove" to opt out of future emails.`;
}

export async function sendProfileOutreachEmail(to: string, name: string) {
  const user = process.env.CRM_SMTP_USER || FROM_EMAIL;
  const pass = process.env.CRM_SMTP_PASSWORD;

  if (!pass) {
    throw new Error('Missing CRM_SMTP_PASSWORD environment variable');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.CRM_SMTP_HOST || 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const trimmedName = name.trim();

  return transporter.sendMail({
    from: { name: FROM_NAME, address: FROM_EMAIL },
    to,
    subject: SUBJECT,
    html: buildHtml(trimmedName),
    text: buildText(trimmedName),
  });
}
