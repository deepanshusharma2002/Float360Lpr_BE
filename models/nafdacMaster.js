module.exports = (sequelize, DataTypes) => {
    return NafdacMaster = sequelize.define('NafdacMaster', {
        nafdac_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nafdac_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        item_id: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        hs_code: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        exporter_detail: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        exporting_country: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        type_packaging: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        pack_size: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        quatity_approved: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        quality_imported: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        doc_uploaded: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        doc_uploaded_name: {
            type: DataTypes.STRING(255),
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
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'nafdac_master',
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    });
}
