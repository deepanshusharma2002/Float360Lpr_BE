
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('VendorTypeMaster', {
        v_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type_name: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        type_description: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
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
        tableName: 'vendor_type_master',
        timestamps: true
    })
}