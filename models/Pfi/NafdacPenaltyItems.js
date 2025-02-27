module.exports = (sequelize, DataTypes) => {
  const nafdac_penalty_item = sequelize.define(
    "nafdac_penalty_item",
    {
      nafdac_penalty_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nafdac_clearance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      shipment_advise_item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      item_name: {
        type: DataTypes.STRING(255),
        allowNull: true, // Assuming itemName is required
      },
      uom: {
        type: DataTypes.STRING(155),
        allowNull: true, // Allow null if uom can be empty
      },
      qty: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true, // Assuming qty is required
      },
      collected: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      returned: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      label_Lapse: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      over_Import: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      no_Permit: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      false_Declaration: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      no_Cria: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(555),
        allowNull: true, // Allow null for remarks
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
      tableName: "nafdac_penalty_item",
      timestamps: true,
    }
  );

  return nafdac_penalty_item;
};
