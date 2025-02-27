const db = require('../models');  // Assuming the file is in the same directory
const { EmailMessage, EmailAttachments } = db;

const createEmailMessage = async (req, res, next) => {

    let { to, subject, message, mail_type, sender_email, cc, bcc } = req.body;

    //insert message in message table
    const newEmail = await EmailMessage.create({
        sender_email: sender_email || 'front end se nahi aa raha hai',
        to_recipient_emails: to,
        cc_recipient_emails: cc || 'front end se nahi aa raha hai',
        bcc_recipient_emails: bcc || 'front end se nahi aa raha hai',
        subject: subject,
        body_text: message,
        mail_type: mail_type || 'abhi nahi bhej raha',
        send_on: new Date(),
        send_by: 'John Doe'
    });

    // insert attachments in email attachments table
    if (req.file) {
        try {
            const fileBuffer = req.file.buffer;
            const base64String = await fileBuffer.toString("base64");
            req.body.file = {};
            req.body.file.attachment_file = base64String;
            req.body.file.attachment_file_name = req.file.originalname;
            req.body.file.email_message_id = newEmail.email_msg_id;
            const newItem = await EmailAttachments.create(req.body.file);
        } catch (err) {
            next(err);
        }
    }
    next();
}

module.exports = { createEmailMessage }



// Controller method to delte item by id
