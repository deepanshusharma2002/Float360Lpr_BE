const nodemailer = require("nodemailer");
require('dotenv').config();


const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL;


// const SMTP_HOST = process.env.SMTP_HOST;
// const SMTP_USER = process.env.SMTP_USER;
// const SMTP_PASS = process.env.SMTP_PASS;
// const FROM_EMAIL = process.env.FROM_EMAIL;

// let EMAIL= 'suryapratap88599@gmail.com'
// let MAILPASSWORD='tavfnmmttuhnwgyz'


const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});



// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL,
//     pass: MAILPASSWORD,
//   },
// });


const senEmail = async (req, res) => {
  let { to, subject, message } = req.body;
  const file = req.file

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: to,
      subject: subject,
      html: message,
      attachments: file ? [{
        filename: file.originalname,
        content: file.buffer, // Use content if file is in buffer
        contentType: file.mimetype // Specify content type if known
      }] : []
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ Message_sent: info.messageId })

  } catch (err) {
    console.error("Error sending email:", err);
    res.status(400).json({ error: err })
  }

}

module.exports = senEmail;