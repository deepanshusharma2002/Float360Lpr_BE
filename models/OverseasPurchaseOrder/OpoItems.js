const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const opo_items = sequelize.define("opo_items", {
    opo_items_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    rfq_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vendor_id: {
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
    opr_qty: {
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
    quote_qtd: {
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
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'opo_items',
    timestamps: true
  });

  opo_items.associate = (models) => {
    opo_items.belongsTo(models.ItemsMaster, {
      foreignKey: "item_id",
    });
    opo_items.belongsTo(models.quotation_items, {
      foreignKey: "quo_item_id",
    });
  }

  return opo_items;

};
