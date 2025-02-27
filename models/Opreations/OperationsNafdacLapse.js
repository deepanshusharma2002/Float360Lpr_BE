module.exports = (sequelize, DataTypes) => {
  const operations_nafdac_lapse = sequelize.define(
    "operations_nafdac_lapse",
    {
      operations_nafdac_lapse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      operations_nafdac_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      operations_nafdac_master_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lapse_type: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      lapse_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      lapse_narration: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updated_on: {
        type: DataTypes.DATE,
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
      tableName: "operations_nafdac_lapse",
      timestamps: false,
    }
  );
  return operations_nafdac_lapse;
};
