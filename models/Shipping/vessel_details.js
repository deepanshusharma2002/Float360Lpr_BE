module.exports = (sequelize, DataTypes) => {
    const VesselDetails = sequelize.define('VesselDetails', {
        vessel_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        shipping_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        vessel_num: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vessel_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        port_of_loading: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        port_of_discharge: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true,
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true,
        }

    }, {
        tableName: 'vessel_details',
        timestamps: true,
    });

    return VesselDetails;
};
