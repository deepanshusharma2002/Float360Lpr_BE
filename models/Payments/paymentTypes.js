/**
* Description: penalty terms show in rfq
* Developer: Rakesh
* Created Date: 12-08-2024
* Updated By:
* Last Updated:
*/

module.exports = (sequelize, DataTypes) => {
    const PaymentTypeMaster = sequelize.define('payment_type_master', {
        payment_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        payment_type_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        tableName: 'payment_type_master_new',
        timestamps: true
    });

    PaymentTypeMaster.associate = models => {
        // Define associations here
        PaymentTypeMaster.hasMany(models.PaymentRequestMaster, {
            foreignKey: 'payment_type_id',
            as: 'paymentRequests'
        });
    };

    return PaymentTypeMaster;
};
