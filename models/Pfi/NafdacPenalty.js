module.exports = (sequelize, DataTypes) => {
  const nafdac_penalty = sequelize.define(
    "nafdac_penalty",
    {
      nafdac_penalty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nafdac_clearance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      endorsement_penalty_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      first_endorsement: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      Second_endorsement: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      penalty_item_label: {
        type: DataTypes.STRING(555),
        allowNull: true,
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
      tableName: "nafdac_penalty",
      timestamps: true,
    }
  );

  nafdac_penalty.associate = (models) => {
    nafdac_penalty.hasMany(models.nafdac_penalty_item, {
      foreignKey: "nafdac_penalty_id",
    });
  };

  return nafdac_penalty;
};
