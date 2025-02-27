module.exports = (sequelize, DataTypes) => {
    const AddressMaster = sequelize.define('AddressMaster', {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        address_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        entity_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        entity_id: {
            type: DataTypes.INTEGER,
        },
        address_line1: {
            type: DataTypes.STRING(255)
        },
        address_line2: {
            type: DataTypes.STRING(255)
        },
        city: {
            type: DataTypes.STRING(55)
        },
        state: {
            type: DataTypes.STRING(55)
        },
        country: {
            type: DataTypes.STRING(55)
        },
        postal_code: {
            type: DataTypes.STRING(20)
        },
        status: {
            type: DataTypes.INTEGER
        },
        created_by: {
            type: DataTypes.STRING(55)
        },
        updated_by: {
            type: DataTypes.STRING(55)
        }
    }, {
        tableName: 'address_master',
        timestamps: true,
    });

    // VendorsAddressDetailsMaster.associate = (models) => {
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorsMaster, { foreignKey: 'vendor_id' });
    //     VendorsAddressDetailsMaster.belongsTo(models.VendorAddressTypeMaster, { foreignKey: 'address_type_id' });
    // };


    // Define associations
    // AddressMaster.associate = (models) => {
    //     AddressMaster.belongsTo(models.CompanyMaster, { foreignKey: 'entity_id' });

    // };

    // Define associations
    AddressMaster.associate = (models) => {
        AddressMaster.belongsTo(models.CompanyMaster, {
            foreignKey: 'entity_id',
            constraints: false,
        });
        AddressMaster.hasMany(models.OprItems, {
            foreignKey: 'address_id'
        });
        AddressMaster.hasMany(models.rfqitem, {
            foreignKey: 'address_id'
        });
    };




    return AddressMaster;
};
