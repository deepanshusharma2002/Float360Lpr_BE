module.exports = (sequelize, DataTypes) => {
    const shipping_expenses_container_allocation = sequelize.define("shipping_expenses_container_allocation", {
        shipping_expenses_container_allocation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        operations_shipping_expenses_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        add_shippment_container_id: {
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
        container_no: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        container_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        container_deposit: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fixed_container_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        demurrage_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        from_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        to_date: {
            type: DataTypes.DATEONLY,
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
        tableName: 'shipping_expenses_container_allocation',
        timestamps: true
    });

    return shipping_expenses_container_allocation;
};
