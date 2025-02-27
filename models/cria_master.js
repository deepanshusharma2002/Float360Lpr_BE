module.exports = (sequelize, DataTypes) => {
    const CriaMaster = sequelize.define('cria_master', {
        cria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cria_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hs_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        exporter_detail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        exporting_country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type_packaging: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pack_size: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        quantity_approved: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        quality_imported: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true
        },
        doc_uploaded: {
            type: DataTypes.STRING,
            allowNull: true
        },
        doc_uploaded_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        tableName: 'cria_master',
        tiemStamp: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    }
    );

    return CriaMaster;
}

