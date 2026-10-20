const ContactMessage = require("../models/ContactMessage");
const nodemailer = require("nodemailer");

exports.createContact = async (req, res, next) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim() : "";
    const message = typeof req.body.message === "string" ? req.body.message.trim() : "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.length > 80) return res.status(400).json({ success: false, message: "Name is required (80 characters max)." });
    if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ success: false, message: "Enter a valid email address." });
    if (message.length < 10 || message.length > 3000) return res.status(400).json({ success: false, message: "Message must be 10–3000 characters." });
    if (mongooseReady() === false) return res.status(503).json({ success: false, message: "Contact service is temporarily unavailable." });

    const saved = await ContactMessage.create({ name, email, message });
    const smtpReady = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO;
    if (smtpReady) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 587,
          secure: String(process.env.SMTP_SECURE) === "true",
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });
        await transporter.sendMail({
          from: process.env.CONTACT_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_TO,
          replyTo: email,
          subject: `Portfolio contact from ${name}`,
          text: `From: ${name} <${email}>\\n\\n${message}`
        });
      } catch (mailError) { console.error("Email notification failed:", mailError.message); }
    }
    res.status(201).json({ success: true, message: "Message sent successfully.", id: saved._id });
  } catch (error) { next(error); }
};

function mongooseReady() {
  const mongoose = require("mongoose");
  return mongoose.connection.readyState === 1;
}
