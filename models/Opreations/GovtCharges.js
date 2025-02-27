module.exports = (sequelize, DataTypes) => {
    const govt_charges = sequelize.define(
      "govt_charges",
      {
        govt_charges_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        pfi_id:{
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        pfi_num: {
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
        payment_types: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        add_expense: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        paid_to_others: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        invoice_num: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        invoice_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        vat: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        remit_charges: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        narration: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        penalty_approval: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },     
        other_head: {
          type: DataTypes.STRING(155),
          allowNull: true,
        },
        other_narration: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        other_amount: {
          type: DataTypes.INTEGER,
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
        govt_status: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: "govt_charges",
        timestamps: false,
      }
    );

    govt_charges.associate = (models) => {
      govt_charges.belongsTo(models.Pfi_master, {
        foreignKey: "pfi_id",
      });
    }

    return govt_charges;
  };
  