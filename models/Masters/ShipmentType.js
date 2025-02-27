module.exports = (sequelize, DataTypes) => {
    const shipment_type_master = sequelize.define("shipment_type_master", {
        shipment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        shipment_type_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'shipment_type_master',
        timestamps: false
    });

    return shipment_type_master;
};
