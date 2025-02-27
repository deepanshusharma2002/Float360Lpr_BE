module.exports = (sequelize, DataTypes) => {
    const port_destination_master = sequelize.define('port_destination_master', {
        port_destination_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        port_destination_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(55),
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
        country_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'port_destination_master',
        timestamps: true,
    });
    
    return port_destination_master;

};
