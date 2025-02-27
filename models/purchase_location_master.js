
module.exports = (sequelize, DataTypes) => {
    const purchaseLocation = sequelize.define('PurchaseLocationMaster', {
        purchase_location_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        purchase_location_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line1: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line2: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        opening_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        purchase_location_status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'purchase_location_master',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    })

    return purchaseLocation;
};


