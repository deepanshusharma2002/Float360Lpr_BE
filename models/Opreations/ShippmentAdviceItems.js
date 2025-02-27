module.exports = (sequelize, DataTypes) => {
  const shipment_advise_items = sequelize.define(
    "shipment_advise_items", // Model name (this will map to the table name `shipment_advise_items`)
    {
      shipment_advise_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // Auto-increment primary key
      },
      shipment_advise_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Required field
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Required field
      },
      ci_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true, // Required field
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Required field
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Required field
      },
      po_item_id: {
        type: DataTypes.STRING(50),
        allowNull: true, // Required field
      },
      item_type: {
        type: DataTypes.STRING(100),
        allowNull: true, // Nullable
      },
      item_specification: {
        type: DataTypes.STRING(255),
        allowNull: true, // Nullable
      },
      item_description: {
        type: DataTypes.STRING(255),
        allowNull: true, // Nullable
      },
      opo_qty: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable
      },
      rate: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true, // Nullable
      },
      ci_line_total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true, // Nullable
      },
      currency: {
        type: DataTypes.STRING(50),
        allowNull: true, // Nullable
      },
      remarks: {
        type: DataTypes.STRING(255),
        allowNull: true, // Nullable
      },
      hsn_code: {
        type: DataTypes.STRING(255),
        allowNull: true, // Nullable
      },
      paar_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable
      },
      grn_qty: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true, // Nullable
      },
      pack_type: {
        type: DataTypes.STRING(50),
        allowNull: true, // Nullable
      },
      pack_size: {
        type: DataTypes.STRING(50),
        allowNull: true, // Nullable
      },
      no_of_packs: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "shipment_advise_items", // Name of the table in the database
      timestamps: true, // We handle created_at/updated_at manually
    }
  );

  shipment_advise_items.associate = (models) => {
    shipment_advise_items.belongsTo(models.po_items, {
      foreignKey: "po_item_id",
    });
    shipment_advise_items.belongsTo(models.ItemsMaster, {
      foreignKey: "item_id",
    });
    shipment_advise_items.belongsTo(models.container_type_master, {
      foreignKey: "pack_type",
    });
  };

  return shipment_advise_items;
};
