module.exports = (sequelize, DataTypes) => {
    const grn_item = sequelize.define(
      "grn_item",
      {
        grn_item_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        grn_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "grn_master",
            key: "grn_id",
          },
        },
        item_code: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        item_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        uom: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        pack: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        po_qty: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        previous_received: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        po_rate: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        inv_qty: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        packs_in_inv: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        rec_qty: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        rec_pack: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        qty_short_rec: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        pack_short_rec: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        damage_qty: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        damage_pack_rec: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        grn_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        vat: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
        },
        balance_qty: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        full_received: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "grn_items",
        timestamps: true,
      }
    );
  
    return grn_item;
  };