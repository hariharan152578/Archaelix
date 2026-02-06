import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // 1. Destructure the data (Adding 'subject' from your new form)
    const { name, email, subject, message } = await req.json();
    
    console.log("Form Data Received:", { name, email, subject, message });

    const frommail = "hariharan152578@gmail.com";
    const frompass = "hakm rspr wasw ljwy";

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: frommail,
        pass: frompass,
      },
    });

    // 3. Define the email options
    const mailOptions = {
      from: frommail,
      to: "hariharan152578@gmail.com", // You usually want to receive the leads at your own email
      replyTo: email, // This allows you to just click 'Reply' to email the user back
      subject: `Archaelix Lead: ${subject || "No Subject"}`, 
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #df1612;">New Contact Form Submission</h2>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
          <br />
          <p style="font-size: 12px; color: #888;">Sent via Archaelix Website Portfolio</p>
        </div>
      `,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("SMTP Error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}