import nodemailer from 'nodemailer';

async function testSMTP() {
  console.log("Testing SMTP connection with guessed credentials...");
  
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // STARTTLS
    requireTLS: true,
    auth: {
      user: "info@americanlegendicecreamtruck.com",
      pass: "Khaldoun#american2026"
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"American Legend Ice Cream Truck" <info@americanlegendicecreamtruck.com>',
      to: "info@americanlegendicecreamtruck.com",
      subject: "SMTP Test",
      text: "If you see this, SMTP is working!"
    });
    console.log("SUCCESS! Message sent: %s", info.messageId);
  } catch (error: any) {
    console.error("FAILED to send using smtp.office365.com:", error.message);
    
    // Try gmail as a fallback
    console.log("Trying smtp.gmail.com as fallback...");
    const gmailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "info@americanlegendicecreamtruck.com",
        pass: "americanlegend2026"
      }
    });
    
    try {
      const gmailInfo = await gmailTransporter.sendMail({
        from: '"American Legend Ice Cream Truck" <info@americanlegendicecreamtruck.com>',
        to: "info@americanlegendicecreamtruck.com",
        subject: "SMTP Test",
        text: "If you see this, SMTP is working!"
      });
      console.log("SUCCESS! Message sent using Gmail: %s", gmailInfo.messageId);
    } catch (gError: any) {
      console.error("FAILED to send using smtp.gmail.com:", gError.message);
    }
  }
}

testSMTP();
