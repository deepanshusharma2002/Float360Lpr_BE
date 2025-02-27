module.exports = (sequelize, DataTypes) => {
  const additional_cost_freigth = sequelize.define(
    "additional_cost_freigth",
    {
      additional_cost_freigth_id: {
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
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_table_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      number_container: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_container: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rate: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      total_freigth: {
        type: DataTypes.DECIMAL(18, 2),
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
      tableName: "additional_cost_freigth",
      timestamps: false,
    }
  );

  additional_cost_freigth.associate = (models) => {
    additional_cost_freigth.belongsTo(models.quotation_master, {
      foreignKey: "quo_id",
    });
  };

  return additional_cost_freigth;
};
