module.exports = (sequelize, DataTypes) => {
  const opo_items = sequelize.define("opo_items", {
    opo_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    opo_id: {
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
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    opo_qty: {
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
    tableName: 'opo_items',
    timestamps: true
  });

  return opo_items;
};
