import nodemailer from "nodemailer";

// Set up the Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  // Replace with your email service provider's SMTP settings
  host: 'smtp.ca.n0c.com',
  port: 587,
  secure: false,
  auth: {
    user: 'no-reply@solux-elearning.com',
    pass: 'Def@ult237X',
  },
});

export default transporter;