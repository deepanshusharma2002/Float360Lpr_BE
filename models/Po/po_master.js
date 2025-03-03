module.exports = (sequelize, DataTypes) => {
    const po_master = sequelize.define("po_master", {
        po_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        po_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        selected_opo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        opr_ids: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        opr_nums: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        rfq_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        quo_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        vendor_approval_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        grn_status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        lead_time: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        payment_terms: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        acceptance_remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        delivery_terms: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        final_doc_dispatch_no: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        disptach_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'po_master',
        timestamps: false
    });

    po_master.associate = (models) => {
        po_master.hasMany(models.po_items, {
            foreignKey: "po_id",
        });
        po_master.belongsTo(models.vendor, {
            foreignKey: "vendor_id",
        });
        po_master.belongsTo(models.quotation_master, {
            foreignKey: "quo_id",
        });
        po_master.belongsTo(models.delivery_terms_quo, {
            foreignKey: "delivery_terms",
        });
        // po_master.hasOne(models.shippment_instructions, {
        //     foreignKey: "po_id",
        // });
        // po_master.hasOne(models.shippment_advise_master, {
        //     foreignKey: "po_id",
        // });
        // po_master.hasMany(models.add_shippment_container, {
        //     foreignKey: "po_id",
        // });
      }

    return po_master;
};
