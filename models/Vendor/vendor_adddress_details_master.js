module.exports = (sequelize, DataTypes) => {
    const VendorsAddressDetailsMaster = sequelize.define('AddressDetailsMaster', {
        v_add_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
            type: DataTypes.STRING(55),
            allowNull: true
        },
        state: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(55),
            allowNull: true 
        },
        postal_code: {
            type: DataTypes.STRING(20),
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
        tableName: 'vendors_address_detials_master',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    // VendorsAddressDetailsMaster.associate = (models) => {
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorsMaster, { foreignKey: 'vendor_id' });
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorAddressTypeMaster, { foreignKey: 'address_type_id' });
    // };

    VendorsAddressDetailsMaster.associate = (models) => {
        VendorsAddressDetailsMaster.belongsTo(models.VendorsMaster, { foreignKey: 'vendor_id' });
    };


    return VendorsAddressDetailsMaster;
};
