module.exports = (sequelize, DataTypes) => {
    const grn_qty = sequelize.define(
      "grn_qty",
      {
        grn_qty_id: {
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
        pfi_id: {
          type: DataTypes.INTEGER,
          allowNull: true, // Required field
        },
        shipment_advise_item_id: {
          type: DataTypes.INTEGER,
          allowNull: true, // Required field
        },
        ci_id: {
          type: DataTypes.INTEGER,
          allowNull: true, // Required field
        },
        ci_num: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        grn_qty: {
          type: DataTypes.DECIMAL(18, 2),
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
        tableName: "grn_qty", // Name of the table in the database
        timestamps: true, // We handle created_at/updated_at manually
      }
    );
  
    return grn_qty;
  };
  