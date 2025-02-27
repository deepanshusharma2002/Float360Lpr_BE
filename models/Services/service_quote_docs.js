module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        service_doc_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        service_quote_id: {
            type: DataTypes.INTEGER
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
        remark: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        tableName: 'documents_master',
        timestamps: true
    });


    return Document;
};