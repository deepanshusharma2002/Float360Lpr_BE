module.exports = (sequelize, DataTypes) => {
    const operations_shipping_expenses = sequelize.define("operations_shipping_expenses", {
        operations_shipping_expenses_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pfi_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pfi_num: {
            type: DataTypes.STRING(100),
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
        shipping_line: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bill_no: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        provision: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        payment_by: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        bill_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        vat: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        narration: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        reverse: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        reverse_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'operations_shipping_expenses',
        timestamps: true
    });

    operations_shipping_expenses.associate = (models) => {
        operations_shipping_expenses.belongsTo(models.po_master, {
            foreignKey: "ci_id",
        });
        operations_shipping_expenses.hasMany(models.shipping_additinal_expenses, {
            foreignKey: "operations_shipping_expenses_id",
        });
        operations_shipping_expenses.hasMany(models.shipping_expenses_container_allocation, {
            foreignKey: "operations_shipping_expenses_id",
        });
      }

    return operations_shipping_expenses;
};
