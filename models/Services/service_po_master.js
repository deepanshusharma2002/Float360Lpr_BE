module.exports = (sequelize, DataTypes) => {
    const service_po_master = sequelize.define("service_po_master", {
        service_po_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_po_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        service_quo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        payment_terms: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        acceptance_remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        delivery_terms: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        delivery_start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        delivery_end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'service_po_master',
        timestamps: true
    });
    return service_po_master;
};
