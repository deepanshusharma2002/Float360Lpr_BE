const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const quotation_items = sequelize.define("quotation_items", {
    quo_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quo_id: {
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
    rfq_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },  
    quo_num: {
      type: DataTypes.STRING(55),
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
    uom_name: {
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
    item_name_label: {
      type: DataTypes.STRING(555),
      allowNull: true
    },
    item_name_vendor: {
      type: DataTypes.STRING(555),
      allowNull: true
    },
    cria_required: {
      type: DataTypes.STRING(255),
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
    tableName: 'quotation_items',
    timestamps: true
  });


  quotation_items.associate = (models) => {
    quotation_items.belongsTo(models.ItemsMaster, { foreignKey: 'item_id' });
    quotation_items.belongsTo(models.RfqItemDetail, { foreignKey: 'rfq_item_id' });
  };

  return quotation_items;

};
