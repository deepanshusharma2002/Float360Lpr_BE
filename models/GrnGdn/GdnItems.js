module.exports = (sequelize, DataTypes) => {
    const GdnItems = sequelize.define("GdnItems", {
        gdn_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        tableName: 'gdn_items',
        timestamps: true
    });

    // Association
    GdnItems.associate = (models) => {
        GdnItems.belongsTo(models.GdnMaster, { foreignKey: 'gdn_id' });
    };
    return GdnItems;
};
