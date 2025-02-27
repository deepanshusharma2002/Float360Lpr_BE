module.exports = (sequelize, DataTypes) => {

  const operations_nafdac_master = sequelize.define(
    "operations_nafdac_master",
    {
      operations_nafdac_master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      nafdac_applied_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      payment_type: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      penalty_type: {
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
      penalty_type_text: {
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
      tableName: "operations_nafdac_master",
      timestamps: false,
    }
  );
  
  operations_nafdac_master.associate = (models) => {
    operations_nafdac_master.belongsTo(models.Pfi_master, {
      foreignKey: "pfi_id",
    });
  }


  return operations_nafdac_master;

};
