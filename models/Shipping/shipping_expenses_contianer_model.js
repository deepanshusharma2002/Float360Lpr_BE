module.exports = (sequelize, DataTypes) => {
    const ContainerExpenses = sequelize.define("ContainerExpenses", {
        container_expenses_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        shipping_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        shipping_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        expenses_type: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        invoice_no: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        invoice_date: {
            type: DataTypes.DATE,
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
        document_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        document: {
            type: DataTypes.BLOB("long"),
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
        tableName: 'contianer_shipping_expenses',
        timestamps: true
    });

    return ContainerExpenses;
};
