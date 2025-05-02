import { MailService } from '@sendgrid/mail';

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set. Email functionality will not work.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("Cannot send email: SENDGRID_API_KEY is not set");
      return false;
    }

    const defaultFrom = 'website@propertylegend.co.ke';
    
    await mailService.send({
      to: params.to,
      from: params.from || defaultFrom,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
      replyTo: params.replyTo
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export function formatContactEmail(data: { 
  name: string; 
  email: string; 
  phone: string; 
  subject: string; 
  message: string;
}): { text: string; html: string } {
  // Plain text version
  const text = `
New Contact Form Submission
---------------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
---------------------------
Message:
${data.message}
---------------------------
  `;

  // HTML version
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #3a5468; color: white; padding: 15px; text-align: center; }
    .content { padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 10px; }
    .field strong { width: 100px; display: inline-block; }
    .message { margin-top: 20px; padding: 15px; background-color: #f9f9f9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field"><strong>Name:</strong> ${data.name}</div>
      <div class="field"><strong>Email:</strong> ${data.email}</div>
      <div class="field"><strong>Phone:</strong> ${data.phone}</div>
      <div class="field"><strong>Subject:</strong> ${data.subject}</div>
      
      <div class="message">
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return { text, html };
}