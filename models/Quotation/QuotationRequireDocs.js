module.exports = (sequelize, DataTypes) => {
    const quo_require_docs = sequelize.define('quo_require_docs', {
        quo_require_docs_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doc_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        doc_remarks: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        isAvailable: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        doc_filename: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        doc_file: {
            type: DataTypes.TEXT,
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
        },
    }, {
        tableName: 'quo_require_docs',
        timestamps: true
    });
    return quo_require_docs;
};
