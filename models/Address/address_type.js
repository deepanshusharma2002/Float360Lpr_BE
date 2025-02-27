module.exports = (sequelize, DataTypes) => {
    const AddressTypeMaster = sequelize.define('AddressTypeMaster', {
        address_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        address_type_name: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        }
    }, {
        tableName: 'address_type_master',
        timestamps: true,
    });

    // VendorsAddressDetailsMaster.associate = (models) => {
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorsMaster, { foreignKey: 'vendor_id' });
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorAddressTypeMaster, { foreignKey: 'address_type_id' });
    // };

    return AddressTypeMaster;
};
