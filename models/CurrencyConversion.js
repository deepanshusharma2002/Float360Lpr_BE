module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CurrencyConversion', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        currency_from: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        currency_to: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        conversion_rate: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false
        },
        valid_from: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        valid_to: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    })
}


