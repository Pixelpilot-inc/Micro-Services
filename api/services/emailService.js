// services/emailService.js
const nodemailer = require("nodemailer");
require('dotenv').config(); // To load environment variables from .env file

// Email service setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email
    pass: process.env.EMAIL_PASS  // Use environment variable for password
  }
});

const sendContactEmail = async ({ name, email, phone, description }) => {
  const mailOptions = {
    from: email, // Sender's email
    to: 'khedekar5aditya@gmail.com', // Recipient's email
    subject: `New message from ${name}`, // Subject of the email
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDescription: ${description}`, // Body of the email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true };
  } catch (error) {
    console.log("Error sending email: ", error);
    throw new Error("Email could not be sent");
  }
};


module.exports = { sendContactEmail };
