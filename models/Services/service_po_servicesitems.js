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
    rfq_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quo_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    po_item_description: {
      type: DataTypes.STRING(255),
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
    rate: {
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
  };

  return po_items;
}; 
