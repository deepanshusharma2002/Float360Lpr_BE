module.exports = (sequelize, DataTypes) => {
    const ServiceMaster = sequelize.define('ServiceMaster', {
        service_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        service_series: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        service_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        service_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        service_type: {
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
        tableName: 'service_master',
        timestamps: true,
    })
    return ServiceMaster;
};
