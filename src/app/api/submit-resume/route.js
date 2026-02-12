import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // 1️⃣ Parse FormData
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const file = formData.get("resume");
    const phone = formData.get("phone");

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and Email are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Create Zoho SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // Port 465 requires secure true
      auth: {
        user: process.env.SMTP_USER1,
        pass: process.env.SMTP_PASS1,
      },
    });

    // 3️⃣ Prepare Mail Options
    const resumeMailOptions = {
      from: `"Archaelix Recruitment" <${process.env.SMTP_USER1}>`,
      to: process.env.SMTP_USER1, 
      replyTo: email,
      subject: `New Resume: ${name} via Archaelix`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message || "N/A"}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #df1612;">New Talent Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#f4f4f4;padding:15px;border-radius:8px;">
            ${message || "N/A"}
          </div>
          <br />
          <p style="font-size:12px;color:#888;">
            Sent via Archaelix Careers Page
          </p>
        </div>
      `,
      attachments: [],
    };

    // 4️⃣ Handle Resume Attachment
    if (file && typeof file !== "string") {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { message: "Only PDF or Word documents are allowed" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      // 5MB limit
      if (buffer.length > 5 * 1024 * 1024) {
        return NextResponse.json(
          { message: "File size must be less than 5MB" },
          { status: 400 }
        );
      }

      resumeMailOptions.attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // 5️⃣ Send Email
    await transporter.sendMail(resumeMailOptions);

    return NextResponse.json(
      { message: "Application sent successfully!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("SMTP Error:", error);
    return NextResponse.json(
      { message: "Failed to send application" },
      { status: 500 }
    );
  }
}
