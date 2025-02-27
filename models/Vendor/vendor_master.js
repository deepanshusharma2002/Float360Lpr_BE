module.exports = (sequelize, DataTypes) => {
    const vendor = sequelize.define('VendorsMaster', {
        vendor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        vendor_series: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        existing_vendor_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        vendor_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        alternate_phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact_person: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contact_person_phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        contact_person_email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        tax_id: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        payment_terms_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pan_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        tin_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        gst_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        vat_num: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        reference_by: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        vendor_type_id: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        vendor_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        registration_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        compliance_status: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        last_audited_docs_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        last_audited_docs: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        }
    }, {
        tableName: 'vendors_master',
        timestamps: true
    })

    vendor.associate = (model) => {
        vendor.hasMany(model.po_master, {
            foreignKey: 'vendor_id'
        });
    };

    vendor.associate = (models) => {
        vendor.hasMany(models.po_master, {
            foreignKey: 'vendor_id',
        });
        vendor.hasMany(models.VendorsAddressDetailsMaster, {
            foreignKey: 'vendor_id',
        });
        vendor.hasMany(models.VendorsBanksDetailsMaster, {
            foreignKey: 'vendor_id',
        });
        // vendor.hasMany(models.quotation_master, {
        //     foreignKey: 'vendor_id',
        // });
    };

    return vendor
}
