import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const sendNotificationEmail = async ({
  toEmail,
  crafterName,
  reviewText,
  sentiment,
  translated,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const body = `
Hi ${crafterName},

You just received a new review on Craftopia:

📝 Original Review:
"${reviewText}"

${
  translated ? `🌍 Translated:\n"${translated}"\n\n` : ""
}📊 Sentiment Detected: ${sentiment.toUpperCase()}

Thanks,  
Craftopia Bot
`;

  await transporter.sendMail({
    from: `"Craftopia Reviews" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `📢 New Review Feedback: ${sentiment.toUpperCase()}`,
    text: body,
  });
};
