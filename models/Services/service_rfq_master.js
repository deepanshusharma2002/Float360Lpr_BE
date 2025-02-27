module.exports = (sequelize, DataTypes) => {
    const ServiceRfqMaster = sequelize.define("ServiceRfqMaster", {
        service_rfq_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        service_num: {
            type: DataTypes.STRING(100),
            allowNull: true,
            default: 'SERVICE_SERISE'
        },
        service_type_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        po_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        service_description: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        no_quot_email_alert: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        vendor_ids_list: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 1
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'service_rfq_master',
        timestamps: true,
    });
    return ServiceRfqMaster;
};
