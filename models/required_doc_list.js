module.exports = (sequelize, DataTypes) => {
    const reqdocmaster = sequelize.define('require_doc_master', {
        req_doc_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        module_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        req_doc_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        req_doc_description: {
            type: DataTypes.STRING(255),
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
        tableName: 'require_doc_master',
        timestamps: true
    })
    return reqdocmaster;
};


