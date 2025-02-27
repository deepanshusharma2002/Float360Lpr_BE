module.exports = (sequelize, DataTypes) => {
  const assessment = sequelize.define(
    "assessment",
    {
      assessment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      assessment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      c_number: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      assess_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      agent_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      duty_to_be_paid_to_bank: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      payment_by: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      exchange_rate: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      cif_value: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      duty_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      surcharge_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      ciss_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      elts_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      levy_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      vat_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      penalty_amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      total_duty: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
      },
      assessment_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      financing_ncs_operation: {
        type: DataTypes.DECIMAL(20, 2),
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
      tableName: "assessment",
      timestamps: false,
    }
  );

  assessment.associate = (models) => {
    assessment.belongsTo(models.Pfi_master, {
      foreignKey: "pfi_id",
    });
  };

  return assessment;
};
