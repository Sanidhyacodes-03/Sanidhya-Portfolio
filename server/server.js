import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import Message from './models/Message.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  })
)
app.use(express.json())

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
  }
}

connectDB()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    : undefined
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  try {
    const savedMessage = await Message.create({ name, email, subject, message })

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO) {
      await transporter.sendMail({
        from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `Portfolio Inquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <h2>New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `
      })
    }

    return res.status(201).json({
      message: 'Inquiry stored successfully.',
      data: savedMessage
    })
  } catch (error) {
    console.error('Contact form error:', error.message)
    return res.status(500).json({ message: 'Server error while saving inquiry.' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
