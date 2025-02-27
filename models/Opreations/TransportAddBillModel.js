module.exports = (sequelize, DataTypes) => {
  const transport_add_bill = sequelize.define(
    "transport_add_bill",
    {
      transport_add_bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      bl_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      payment_type: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      invoice_no: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      vat: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      narration: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      total: {
        type: DataTypes.DECIMAL(18, 2),
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
      tableName: "transport_add_bill",
      timestamps: true,
    }
  );

  return transport_add_bill;
};
