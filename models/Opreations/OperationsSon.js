module.exports = (sequelize, DataTypes) => {
    const operations_son = sequelize.define(
      "operations_son",
      {
        operations_son_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        ci_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ci_num: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        ci_num: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        payment_type: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        bill_num: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        bill_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        remit_charges: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        vat: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        total: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        narration: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        penalty_approved_by: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        penalty_approved_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        penalty_payment_date: {
          type: DataTypes.DATE,
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
        tableName: "operations_son",
        timestamps: false,
      }
    );
    operations_son.associate = (models) => {
      operations_son.belongsTo(models.commercial_invoice, {
        foreignKey: 'ci_id',
        targetKey: 'commercial_invoice_id'
      });
    };

    return operations_son;
  };
  