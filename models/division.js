const { branch } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Division = sequelize.define('Division', {
        division_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        division_name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'division',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    })

    Division.associate = (models) => {
        Division.hasMany(models.OprMaster, { foreignKey: 'division_id' });
    };

    return Division;
};