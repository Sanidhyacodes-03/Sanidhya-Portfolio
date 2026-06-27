import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Resend } from "resend";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------- Middleware ---------------------
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// --------------------- MongoDB ---------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error");
    console.error(error);
    process.exit(1);
  }
};

connectDB();

// --------------------- Resend ---------------------
const resend = new Resend(process.env.RESEND_API_KEY);

// --------------------- Routes ---------------------

app.get("/", (req, res) => {
  res.send("🚀 Portfolio API Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio API is running",
  });
});

// --------------------- Contact API ---------------------

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
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

    // Send Email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Inquiry: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>📩 New Portfolio Contact Form</h2>
          <hr/>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>

          <hr/>

          <small>Sent from Portfolio Website</small>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend Error");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    console.log("✅ Email sent successfully");
    console.log(data);

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
      data: savedMessage,
    });
  } catch (error) {
    console.error("❌ Contact Form Error");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// --------------------- Start Server ---------------------

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});