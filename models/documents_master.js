module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        document_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        entity_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        document_description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_file_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_string: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        uploaded_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'documents_master',
        timestamps: true
    });


    return Document;
};