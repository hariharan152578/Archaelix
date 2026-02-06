import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // 1. Parse FormData for file and text fields
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const file = formData.get("resume");

    const frommail = "hariharan152578@gmail.com";
    const frompass = "hakm rspr wasw ljwy";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: frommail,
        pass: frompass,
      },
    });

    // 2. Define Resume Email Options
    const resumeMailOptions = {
      from: email,
      to: frommail, // Recipient
      subject: `New Resume: ${name} via Archaelix`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #df1612;">New Talent Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
      attachments: [],
    };

    // 3. Attach file if it exists
    if (file && typeof file !== "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      resumeMailOptions.attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await transporter.sendMail(resumeMailOptions);

    return NextResponse.json({ message: "Application sent!" }, { status: 200 });
  } catch (error) {
    console.error("SMTP Error:", error);
    return NextResponse.json({ message: "Failed to send application" }, { status: 500 });
  }
}