module.exports = (sequelize, DataTypes) => {
    const VendorsBanksDetailsMaster = sequelize.define('VendorsBanksDetailsMaster', {
        v_banks_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bank_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bank_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bank_account_number: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        bank_ifsc_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        bank_ref_cheque_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bank_ref_cheque: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING(100),
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
        sequelize,
        modelName: 'VendorsBanksDetailsMaster',
        tableName: 'vendors_banks_details_master',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    // VendorsBanksDetailsMaster.associate = (models) => {
    //     VendorsBanksDetailsMaster.belongsTo(models.VendorsMaster, { foreignKey: 'vendor_id' });
    //     VendorsBanksDetailsMaster.belongsTo(models.VendorBankTypeMaster, { foreignKey: 'bank_type_id' });
    // }; 
    
    return VendorsBanksDetailsMaster;
};
