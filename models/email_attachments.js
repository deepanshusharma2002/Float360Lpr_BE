module.exports = (sequelize, DataTypes) => {
    const EmailAttachments = sequelize.define('EmailAttachments', {
        email_attachment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email_message_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        attachment_file_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        attachment_file: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        send_on: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createdAt'
        },
        send_by: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'email_attachments',
        timestamps: true,
        createdAt: 'send_on',
        updatedAt: false,
    })

    return EmailAttachments
};

