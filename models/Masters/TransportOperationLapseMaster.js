module.exports = (sequelize, DataTypes) => {
    const transport_operation_lapse_master = sequelize.define("transport_operation_lapse_master", {
        transport_operation_lapse_master_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        transport_operation_lapse_name: {
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
        tableName: 'transport_operation_lapse_master',
        timestamps: false
    });

    return transport_operation_lapse_master;
};
