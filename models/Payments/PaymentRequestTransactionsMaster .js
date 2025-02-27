module.exports = (sequelize, DataTypes) => {
  const PaymentRequestTransactionsMaster = sequelize.define(
    "payment_request_transactions_master",
    {
      transactions_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      payment_request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doc_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_id: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      value_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      bank_charge: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      from_bank_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      to_bank_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      receipt_image_name: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bank_refenence_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reference_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      receipt_image: {
        type: DataTypes.TEXT,
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updatedAt",
      },
    },
    {
      tableName: "payment_transactions_master",
      timestamps: true,
    }
  );

  PaymentRequestTransactionsMaster.associate = (models) => {
    PaymentRequestTransactionsMaster.belongsTo(models.PaymentRequestMaster, {
      foreignKey: "payment_request_id",
      as: "paymentRequest",
    });
    PaymentRequestTransactionsMaster.belongsTo(
      models.VendorsBanksDetailsMaster,
      {
        foreignKey: "from_bank_detail_id",
      }
    );
  };
  return PaymentRequestTransactionsMaster;
};
