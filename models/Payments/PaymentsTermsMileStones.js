module.exports = (sequelize, DataTypes) => {
    const PaymentTermsMilesStones = sequelize.define("PaymentTermsMilesStones", {
        payment_terms_milestone_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        payment_term_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        milestone: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        percentage_value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'payment_terms_milestones',
        timestamps: true
    });
    return PaymentTermsMilesStones;
};
