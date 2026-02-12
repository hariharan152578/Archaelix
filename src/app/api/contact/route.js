import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
  const { name, email, subject, message, phone } = await req.json();

    console.log("Form Data Received:", { name, email, subject, message,phone});

    // ✅ Use ENV variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USER2,
        pass: process.env.SMTP_PASS2,
      },
    });

    const mailOptions = {
      from: `"Archaelix Recruitment" <${process.env.SMTP_USER2}>`,
      to: process.env.SMTP_USER2,
      replyTo: email,
      subject: `Archaelix Lead: ${subject || "No Subject"}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        Phone: ${phone}
      `,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #df1612;">New Contact Form Submission</h2>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
          <br />
          <p style="font-size: 12px; color: #888;">
            Sent via Archaelix Website Portfolio
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("SMTP Error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
