module.exports = (sequelize, DataTypes) => {
  const shippment_advise_additional_instruction = sequelize.define(
    "shippment_advise_additional_instruction",
    {
      shippment_advise_additional_instruction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      shippment_advise_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      po_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      other: {
        type: DataTypes.STRING(255),
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
      tableName: "shippment_advise_additional_instruction",
      timestamps: false,
    }
  );

  return shippment_advise_additional_instruction;
};
