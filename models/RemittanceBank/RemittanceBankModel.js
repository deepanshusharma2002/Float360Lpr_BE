module.exports = (sequelize, DataTypes) => {
  const remittance_bank = sequelize.define(
    "remittance_bank",
    {
      remittance_bank_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ci_num: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pfi_num:{
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      remittance_amount_ngn: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      head_bank_charges: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      amount_ngn: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "remittance_bank",
      timestamps: false,
    }
  );

  return remittance_bank;
};
