module.exports = (sequelize, DataTypes) => {
    const ShipMode = sequelize.define('ShipMode', {
        shipment_mode_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        shipment_mode_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'created_on', // Use field option to specify the actual column name in the database
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        updated_on: {
            type: DataTypes.DATE,
            field: 'updated_on', // Use field option to specify the actual column name in the database
        }
    }, {
        tableName: 'shipment_mode',
        timestamps: true, // Enable timestamps for createdAt and updatedAt
        createdAt: 'created_on', // Map createdAt to created_on column
        updatedAt: 'updated_on', // Map updatedAt to updated_on column
    });

    ShipMode.associate = (models) => {
        ShipMode.hasMany(models.OprMaster, { foreignKey: 'shipment_mode_id' });
    };

    return ShipMode;
};
 