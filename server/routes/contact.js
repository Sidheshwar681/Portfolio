import express from 'express';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

const router = express.Router();

// Message schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'Portfolio Contact' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
  }

  try {
    // Save to DB if connected
    if (mongoose.connection.readyState === 1) {
      await Message.create({ name, email, subject, message });
    }

    // Send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: subject || `Portfolio message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:30px;background:#0a0f1e;color:#e2e8f0;border-radius:12px;border:1px solid #1a2a4a">
            <h2 style="color:#00d4ff;margin-bottom:8px">New Portfolio Message</h2>
            <p style="color:#94a3b8;margin-bottom:24px">From: <strong style="color:#e2e8f0">${name}</strong> &lt;${email}&gt;</p>
            <div style="background:#0d1427;padding:20px;border-radius:8px;border-left:3px solid #b44ffd">
              <p style="margin:0;line-height:1.7">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color:#475569;font-size:12px;margin-top:24px">Sent via portfolio contact form</p>
          </div>
        `,
      });
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' });
  }
});

export default router;
