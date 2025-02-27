module.exports = (sequelize, DataTypes) => {
    const ServiceQuo2 = sequelize.define("ServiceQuo", {
        service_quo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_quo_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        po_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        service_rfq_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        valid_from: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        valid_to: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        shipping_line: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        from_port: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        to_port: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        vehicle_schedule_ets: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        vehicle_schedule_ets2: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        vehicle_schedule_ets3: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        vehicle_schedule_eta: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        vehicle_schedule_eta2: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        vehicle_schedule_eta3: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        quote_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        container_type: {
            type: DataTypes.STRING(155),
            allowNull: true
        },

        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        po_acceptance_remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'service_quotation_table',
        timestamps: true,
    });
    return ServiceQuo2;
};
