module.exports = (sequelize, DataTypes) => {
  const service_po_quote_master = sequelize.define(
    "service_po_quote_master",
    {
      service_po_quote_master_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      party_name: {
        type: DataTypes.INTEGER,
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
      qoute_remarks: {
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
      tableName: "service_po_quote_master",
      timestamps: true, // Disable createdAt and updatedAt if they are not needed
    }
  );

  service_po_quote_master.associate = (models) => {
    service_po_quote_master.hasMany(models.freight_quote_service_po, {
      foreignKey: "service_po_quote_master_id",
    });
  };

  return service_po_quote_master;
};
