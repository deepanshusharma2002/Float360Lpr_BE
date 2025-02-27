module.exports = (sequelize, DataTypes) => {
    const ServiceFreightList = sequelize.define('ServiceFreightList', {
        freight_list_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        service_quote_id: {
            type: DataTypes.INTEGER
        },
        load_type: {
            type: DataTypes.INTEGER 

        },
        container_type: {
            type: DataTypes.STRING
        },
        rate: {
            type: DataTypes.FLOAT
        },
        cbm_rate_kg: {
            type: DataTypes.FLOAT

        },
        other_charge: {
            type: DataTypes.FLOAT
        },
        freedays_at_pod: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'service_quote_freight_list',
        timestamps: true
    });
    return ServiceFreightList;
};
