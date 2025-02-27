module.exports = (sequelize, DataTypes) => {
    const ServiceTypeMaster = sequelize.define('service_type_master', {
        service_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        service_type_series: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        service_type_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        service_type_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true,
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
        tableName: 'service_type_master',
        timestamps: true,
    })
    return ServiceTypeMaster;
};
