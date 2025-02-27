module.exports = (sequelize, DataTypes) => {
  const additional_cost = sequelize.define(
    "additional_cost",
    {
      additional_cost_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quo_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      charge_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      reference_id: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      reference_table_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      charge_amount: {
        type: DataTypes.DECIMAL(18,4),
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
      heading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      for_delivery_term: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      charges_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "additional_cost",
      timestamps: false,
    }
  );
  return additional_cost;
};
