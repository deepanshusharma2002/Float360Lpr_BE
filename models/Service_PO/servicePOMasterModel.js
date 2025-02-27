module.exports = (sequelize, DataTypes) => {
  const spo_master = sequelize.define(
    "spo_master",
    {
      spo_master_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      po_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      party_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      party_add: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      party_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      party_contact: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quote_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      payment_term: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      // estimated_time_of_shipment: {
      //     type: DataTypes.DATEONLY,
      //     allowNull: true
      // },
      // estimated_time_of_arrival: {
      //     type: DataTypes.DATEONLY,
      //     allowNull: true
      // },
      // sailing_days: {
      //     type: DataTypes.STRING(255),
      //     allowNull: true
      // },
      // free_days_pol:{
      //     type: DataTypes.STRING(255),
      //     allowNull: true
      // },
      // po_remarks: {
      //   type: DataTypes.STRING(555),
      //   allowNull: true,
      // },
      rate_validity_from: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      rate_validity_to: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      vendor_quote_ref_no: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quote_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quote_remarks: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },

      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "spo_master",
      timestamps: true, // Disable createdAt and updatedAt if they are not needed
    }
  );

  spo_master.associate = (models) => {
    spo_master.hasOne(models.spo_items, {
      foreignKey: "spo_master_id",
      onDelete: "CASCADE",
    });
  };

  return spo_master;
};
