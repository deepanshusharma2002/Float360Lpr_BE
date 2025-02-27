module.exports = (sequelize, DataTypes) => {
    const rfqitem = sequelize.define('rfq_items', {
        rfq_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rfq_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quantity: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        additional_qty: {
            type: DataTypes.DECIMAL(10, 2),
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
            allowNull: false,
        },
        uom_name: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        opr_item_remark: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        opr_item_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tolerance: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
    }, {
        timestamps: true, // Disable timestamps if you don't need them
        tableName: 'rfq_items' // Ensure the table name matches your SQL table name exactly
    });

    //association
    rfqitem.associate = (models) => {
        rfqitem.belongsTo(models.ItemsMaster, { foreignKey: 'item_id' });
        rfqitem.belongsTo(models.AddressMaster, { foreignKey: 'address_id' });
        rfqitem.belongsTo(models.OprItems, { foreignKey: 'opr_item_id' });
    };

    return rfqitem;
};




