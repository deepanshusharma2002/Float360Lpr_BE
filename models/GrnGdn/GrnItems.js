module.exports = (sequelize, DataTypes) => {
    const GrnItems = sequelize.define("GrnItems", {
        grn_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        grn_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gdn_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        po_item_qty: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        gdn_item_qty: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        grn_item_qty: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        item_rate: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
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
        tableName: ' grn_items',
        timestamps: true
    });
    // Association
    GrnItems.associate = (models) => {
        GrnItems.belongsTo(models.GrnMaster, { foreignKey: ' grn_master_id' });
    };
    return GrnItems;
};
