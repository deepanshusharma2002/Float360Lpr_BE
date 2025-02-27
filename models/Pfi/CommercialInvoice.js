module.exports = (sequelize, DataTypes) => {
  const commercial_invoice = sequelize.define(
    "commercial_invoice",
    {
      commercial_invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ci_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      ci_sender: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      ci_sender_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      opr_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      shipment_type: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      mode: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      total_package: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      country_supply: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      country_origin: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      port_of_loading: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      port_dc: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      final_destination: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      country_final_destination: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      delivery_terms: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      payment_terms: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bl_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      bl_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vessel_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      vessel_no: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      shipping_line_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      eta_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      free_days: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      total_net_weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      total_gross_weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      seal_num: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      cbm: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      invoice_remarks: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      inland_charges: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      freight_charges: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      ci_amount: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      fob_cost: {
        type: DataTypes.DECIMAL(20, 4),
        allowNull: true,
      },
      rotation_no: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      arrival_dt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      port_of_discharge_shipping: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      transferred_terminal: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },


      po_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
      po_num: {
        type: DataTypes.STRING(155),
        allowNull: true,
      }, 
      shipper_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }, 
      freight: {
        type: DataTypes.STRING(255),
        allowNull: true,
      }, 
      shippment_advise_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
      shipment_status: {
        type: DataTypes.STRING(155),
        allowNull: true,
      }, 
      type_of_bl: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
      bh_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
      company_id: {
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
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      tableName: "commercial_invoice",
      timestamps: false,
    }
  );

  commercial_invoice.associate = (models) => {
    commercial_invoice.belongsTo(models.form_m, {
      foreignKey: "pfi_id",
      targetKey: 'pfi_id',
      as: 'FormM'
    });
    commercial_invoice.belongsTo(models.letter_of_credit, {
      foreignKey: "pfi_id",
      targetKey: 'pfi_id',
      as: 'LC'
    });
    commercial_invoice.belongsTo(models.CompanyMaster, {
      foreignKey: "company_id",
    });
    commercial_invoice.belongsTo(models.BuyingHouse, {
      foreignKey: "bh_id",
    });
    commercial_invoice.belongsTo(models.Pfi_master, {
      foreignKey: "pfi_id",
    });
    commercial_invoice.hasOne(models.soncap_master, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.ci_doc_movement_master, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.other_govt_charges, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.nafdac_clearance, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.nafdac_inspection_expense, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.nafdac_penalty, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.custom_clearance, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.assessment, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.govt_charges, {
      foreignKey: "ci_id",
    });
    commercial_invoice.hasOne(models.operations_son, {
      foreignKey: "ci_id",
      targetKey: "commercial_invoice_id",
    });
  };
  return commercial_invoice;
};
