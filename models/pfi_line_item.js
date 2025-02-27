// const { company_master } = require(".");

module.exports = (sequelize, DataTypes) => {
  const pfi_line_item = sequelize.define("pfi_line_item", {
    pfi_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    opo_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pfi_id: {
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
    payment_request_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rfq_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bh_item_name: {
      type: DataTypes.STRING(555),
      allowNull: true
    },
    opo_qty: {
      type: DataTypes.DECIMAL(18, 2),
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
    no_packs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    margin_percent: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    line_total: {
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
    tableName: 'pfi_line_item',
    timestamps: true
  });


  pfi_line_item.associate = (models) => {
    pfi_line_item.belongsTo(models.ItemsMaster, { foreignKey: 'item_id' });
    pfi_line_item.belongsTo(models.quotation_items, {
      foreignKey: "quo_item_id",
    });
    pfi_line_item.belongsTo(models.rfqitem, {
      foreignKey: "rfq_item_id",
    });
  };

  return pfi_line_item;
};
