const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const payment_terms_quo = sequelize.define("payment_terms_quo", {
        payment_terms_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        payment_terms_name: {
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
            allowNull: false
        }
    }, {
        tableName: 'payment_terms_master_new',
        timestamps: true
    });

    return payment_terms_quo;
};
