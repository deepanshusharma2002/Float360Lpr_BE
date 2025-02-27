module.exports = (sequelize, DataTypes) => {
  const nafdac_clearance = sequelize.define(
    "nafdac_clearance",
    {
      nafdac_clearance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      nafdac_applied_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      nafdac_clearance_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      payment_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      invoice_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      invoice_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      first_endorsement_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      second_endorsement_received_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      release_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      full_release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      partial_release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      full_release_received: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      full_release_received_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sample_collected_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sample_collected_qty: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sample_return: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sample_return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sample_return_qty: {
        type: DataTypes.STRING(255),
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
      tableName: "nafdac_clearance",
      timestamps: true,
    }
  );

  nafdac_clearance.associate = (models) => {
    nafdac_clearance.hasOne(models.nafdac_inspection_expense, {
      foreignKey: 'nafdac_clearance_id',
    });

    nafdac_clearance.hasOne(models.nafdac_penalty, {
      foreignKey: 'nafdac_clearance_id',
    });

    nafdac_clearance.hasMany(models.nafdac_penalty_item, {
      foreignKey: 'nafdac_clearance_id',
    });
  };

  return nafdac_clearance;
};
