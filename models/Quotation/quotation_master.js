module.exports = (sequelize, DataTypes) => {
  const quotation_master = sequelize.define(
    "quotation_master",
    {
      quo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quo_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      rfq_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vendor_reference_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      reference_no: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reference_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      quo_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      quo_valid_till: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      delivery_terms: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      country_origin: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      country_supply: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      port_loading: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      lead_time: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lead_initiation_point: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      unit_justification: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      opr_lead_time: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      port_of_loading: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      approval_status: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      procurement_justification: {
        type: DataTypes.STRING(555),
        allowNull: true,
      },
      procurement_by: {
        type: DataTypes.STRING(255),
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
      updated_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      total_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      po_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      opo_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quote_doc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quote_doc_name: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
    },
    {
      tableName: "quotations_master",
      timestamps: true,
      createdAt: "created_on", // Customize createdAt field name
      updatedAt: "updated_on",
    }
  );

  quotation_master.associate = (models) => {
    quotation_master.hasMany(models.quotation_items, {
      foreignKey: "quo_id",
    });
    quotation_master.hasMany(models.QuoDoc, {
      foreignKey: "quotation_id",
    });
    quotation_master.belongsTo(models.vendor, {
      foreignKey: "vendor_id",
    });
    quotation_master.hasMany(models.additional_cost, {
      foreignKey: "quo_id",
      constraints: false,
    });
    quotation_master.hasOne(models.po_master, {
      foreignKey: "quo_id",
    });
    quotation_master.belongsTo(models.rfq, {
      foreignKey: "rfq_id",
      constraints: false,
    });
    quotation_master.hasMany(models.payment_milestone, {
      foreignKey: "quo_id",
    });
    quotation_master.belongsTo(models.delivery_terms_quo, {
      foreignKey: "delivery_terms",
    });
    quotation_master.hasMany(models.additional_charges_lpr, {
      foreignKey: "quotation_id", // Ensure this matches the foreign key in additional_charges_lpr
    });
    quotation_master.hasMany(models.transportation_charges_lpr, {
      foreignKey: "quotation_id", // Ensure this matches the foreign key in transportation_charges_lpr
    });
    quotation_master.hasMany(models.quo_require_docs, {
      foreignKey: "quo_id",
    });
    quotation_master.hasMany(models.additional_cost_freigth, {
      foreignKey: "quo_id",
    });
    quotation_master.hasMany(models.additional_cost_breakup_freigth, {
      foreignKey: "quo_id",
    });
  };

  return quotation_master;
};
