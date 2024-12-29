import nodemailer from "nodemailer";
import { credentials } from "../Config/credentials.js"; // Use named export

// Send email function
const sendMail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use TLS
    auth: {
      user: credentials.user1,
      pass: credentials.pass1,
    },
    tls: process.env.NODE_ENV !== 'production' ? { rejectUnauthorized: false } : undefined,
    logger: true,
    debug: true, // Enable debug logging
  });

  try {
    await transporter.sendMail({
      from: credentials.user1,
      to: email,
      subject: subject,
      html: message,
    });
    console.log(`Email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`Error sending email: ${err}`);
    console.error('Full error details:', err);
    throw err;
  }
};

// Controller to handle sending an email based on contact form submission
const sendEmail = async (req, res) => {
  const { from_name, user_email, message } = req.body;

  if (!from_name || !user_email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const emailSubject = `Contact Form Submission from ${from_name}`;
    const emailMessage = `
      <p><strong>From:</strong> ${from_name}</p>
      <p><strong>Email:</strong> ${user_email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    const fixedRecipientEmail = "akritigarg1107@gmail.com";

    // Call sendMail function directly here
    // await sendMail(user_email, emailSubject, emailMessage);
    await sendMail(fixedRecipientEmail, emailSubject, emailMessage);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export { sendEmail };
