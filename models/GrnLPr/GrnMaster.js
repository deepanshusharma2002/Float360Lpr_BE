module.exports = (sequelize, DataTypes) => {
    const grn_master = sequelize.define(
      "grn_master",
      {
        grn_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        vendor_invoice_no: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        invoice_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        bill_no: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        bill_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        head_of_charges: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        charges_at_warehouse_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        no_of_trucks: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        transportation_rate: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        transportation_amt: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        vat: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
        },
        total_amt_incl_vat: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        preclaimed_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        invoice_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        round_off: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        total_amount: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true,
        },
        short_close_lpo: {
          type: DataTypes.STRING(50),
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
          defaultValue: 1, // 1 = Active, 0 = Inactive
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "grn_master",
        timestamps: true,
      }
    );
  
    
    grn_master.associate = (models) => {
      grn_master.hasMany(models.grn_item, { foreignKey: "grn_id", as: "items" });
      grn_master.hasMany(models.grn_additional_charge, { foreignKey: "grn_id", as: "additional_charges" });
      grn_master.hasMany(models.grn_file, { foreignKey: "grn_id", as: "files" });
    };
  
    return grn_master;
  };