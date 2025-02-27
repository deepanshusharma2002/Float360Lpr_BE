module.exports = (sequelize, DataTypes) => {
  const po_items = sequelize.define("po_items", {
    po_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    po_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    po_num: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    opo_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rfq_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quo_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_code: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    item_name: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    item_type: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    line_total: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    no_packs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pack_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pack_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    po_qty: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    grn_qty: {
      type: DataTypes.DECIMAL(18, 2),
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
    tableName: 'po_items',
    timestamps: true
  });

  po_items.associate = (models) => {
    po_items.belongsTo(models.po_master, {
      foreignKey: 'po_id',
    });
    po_items.belongsTo(models.ItemsMaster, {
      foreignKey: 'item_id',
    });
    po_items.belongsTo(models.quotation_items, {
      foreignKey: "quo_item_id",
    });
    po_items.belongsTo(models.RfqItemDetail, {
      foreignKey: "rfq_item_id",
    });
  };
  return po_items;
}; 
