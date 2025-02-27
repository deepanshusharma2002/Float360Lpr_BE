//no any futher process is created according to this
module.exports = (sequelize, DataTypes) => {
    const EntityTypeMaster = sequelize.define('EntityTypeMaster', {
        e_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        entity_name: {
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
        },

    }, {
        tableName: 'entity_type_master',
        timestamps: true,
    });

    // VendorsAddressDetailsMaster.associate = (models) => {
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorsMaster, { foreignKey: 'vendor_id' });
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorAddressTypeMaster, { foreignKey: 'address_type_id' });
    // };

    return EntityTypeMaster;
};
