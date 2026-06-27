import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- Middleware --------------------
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// -------------------- MongoDB --------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error");
    console.error(error);
  }
};

connectDB();

// -------------------- Gmail SMTP --------------------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true, // Required for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP on server start
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error");
    console.error(error);
  } else {
    console.log("✅ Gmail SMTP Connected");
  }
});

// -------------------- Routes --------------------
app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio API is running",
  });
});

// -------------------- Contact API --------------------
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Save to MongoDB
    const savedMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    console.log("✅ Message saved to MongoDB");

    // Send Email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Inquiry: ${subject}`,
      html: `
        <h2>New Portfolio Inquiry</h2>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      text: `
Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
      `,
    });

    console.log("✅ Email sent successfully");

    return res.status(201).json({
      success: true,
      message: "Inquiry stored and email sent successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("❌ Contact Form Error");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error while saving inquiry.",
      error: error.message,
    });
  }
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});