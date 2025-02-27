module.exports = (sequelize, DataTypes) => {
    const shipping_additinal_expenses = sequelize.define("shipping_additinal_expenses", {
        shipping_additinal_expenses_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        operations_shipping_expenses_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ci_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ci_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        expense_head: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        }
    }, {
        tableName: 'shipping_additinal_expenses',
        timestamps: true
    });

    return shipping_additinal_expenses;
};
