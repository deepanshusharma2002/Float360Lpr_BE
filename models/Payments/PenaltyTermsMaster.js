/**
* Description: penalty terms show in rfq
* Developer: Rakesh
* Created Date: 17-07-2024
* Updated By:
* Last Updated:17-07-2024
*/


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PenaltyTermsMaster', {
        penalty_terms_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        penalty_terms_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
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
        tableName: 'penalty_terms_master_new',
        timestamps: true
    })
}
