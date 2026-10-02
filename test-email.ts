import { sendEmail } from './src/lib/email';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function test() {
  console.log("Testing email configuration...");
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  
  try {
    const success = await sendEmail({
      to: process.env.SMTP_USER || 'info@americanlegendicecreamtruck.com',
      subject: 'Test Email from System',
      html: '<p>This is a test email to verify SMTP settings.</p>',
      title: 'Test Email'
    });
    console.log("Email send result:", success);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
