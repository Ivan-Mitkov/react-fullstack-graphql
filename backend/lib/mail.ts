import { createTransport, getTestMessageUrl } from "nodemailer";

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeNiceEmail(text: string): string {
  return `<div className="email" style="
  border: 1px solid black;
  padding: 20px;
  font-family: sans-serif;
  line-height: 2;
  font-size: 20px;
">
  <h2>Hello There!</h2>
  <p>${text}</p>

  <p>Sick Fits</p>
</div>`;
}

export async function sendPasswordResetEmail(resetToken: string, to: string) {
  const info = await transporter.sendMail({
    to,
    from: "hello.kitty@YukoShimizu.jp",
    subject: "Your Password Reset Link",
    html: makeNiceEmail(`Your password reset link:
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  });
  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}
