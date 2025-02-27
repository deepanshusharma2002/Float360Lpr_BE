module.exports = (sequelize, DataTypes) => {
  const PaymentRequestMaster = sequelize.define(
    "payment_request_master",
    {
      payment_request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pr_num: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      doc_type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      po_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      po_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      advice_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      advice_amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
      amount_payment_term: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bank_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      advice_remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_milestone_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      request_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
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
      tableName: "payment_request_master_new",
      timestamps: true,
    }
  );

  PaymentRequestMaster.associate = (models) => {
    // PaymentRequestMaster.belongsTo(models.PaymentTypeMaster, {
    //     foreignKey: 'payment_type_id',
    //     as: 'paymentType'
    // });
    PaymentRequestMaster.belongsTo(models.payment_milestone, {
      foreignKey: "payment_milestone_id",
    });
    PaymentRequestMaster.belongsTo(models.VendorsBanksDetailsMaster, {
      foreignKey: "bank_type_id",
    });
  };

  return PaymentRequestMaster;
};
