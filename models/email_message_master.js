module.exports = (sequelize, DataTypes) => {

    const EmailMessage = sequelize.define('EmailMessage', {
        email_msg_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        to_recipient_emails: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cc_recipient_emails: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        bcc_recipient_emails: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        body_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        mail_type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        send_on: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createdAt'
        },
        send_by: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'EmailMessages',
        timestamps: true,
        createdAt: 'send_on',
        updatedAt: false,
    })

    return EmailMessage
};

