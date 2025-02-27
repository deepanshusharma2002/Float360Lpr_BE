module.exports = (sequelize, DataTypes) => {
    const pfi_master = sequelize.define("pfi_master", {
        pfi_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pfi_sender_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pfi_sent_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        opr_no: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        po_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        v_banks_detail_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pfi_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        port_of_delivery: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        pfi_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        exchange_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        shipment_mode: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        shipment_type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        payment_mode: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        delivery_time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        delivery_terms: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        payment_terms: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        country_of_origin: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        country_of_supply: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        container_count_type: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        port_of_loading: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        port_of_discharge: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        final_destination: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        country_of_final_destination: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        pfi_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pfi_fob_total: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        pfi_inland_total: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        pfi_freight_total: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        pfi_amount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        pfi_conversion_rate: {
            type: DataTypes.DECIMAL(18, 4),
            allowNull: true
        },
        opo_selected_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        opo_selected_num: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        opo_ids: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        opo_nums: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'pfi_master',
        timestamps: true,
    }); 

    pfi_master.associate = (models) => {
        pfi_master.hasMany(models.insurance, {
            foreignKey: 'pfi_id',
        });
        pfi_master.hasMany(models.form_m, {
            foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.hasMany(models.letter_of_credit, {
            foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.hasMany(models.son_pfi, {
            foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        });
        // pfi_master.hasMany(models.ShippingMaster, {
        //     foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        // });
        pfi_master.hasMany(models.assessment, {
            foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.belongsTo(models.CompanyMaster, { foreignKey: 'company_id' });
        pfi_master.hasOne(models.operations_nafdac, { foreignKey: 'pfi_id' });
        pfi_master.hasOne(models.paar, { foreignKey: 'pfi_id' });
        pfi_master.hasOne(models.operations_nafdac_master, { foreignKey: 'pfi_id' });
        pfi_master.hasOne(models.govt_charges, { foreignKey: 'pfi_id' });
        pfi_master.hasOne(models.nafdac_pfi, {
            foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.belongsTo(models.opo_master, {
            foreignKey: 'opo_selected_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.hasOne(models.commercial_invoice, {
            foreignKey: 'pfi_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.belongsTo(models.VendorsBanksDetailsMaster, {
            foreignKey: 'v_banks_detail_id',  // Ensure this matches the foreign key in insuranc
        });
        pfi_master.hasMany(models.Pfi_line_items, { foreignKey: 'pfi_id' });
    };

    return pfi_master;
};