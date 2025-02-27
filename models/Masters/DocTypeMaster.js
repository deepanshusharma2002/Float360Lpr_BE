module.exports = (sequelize, DataTypes) => {
    const DocTypeMaster = sequelize.define("DocTypeMaste", {
        doc_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doc_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        doc_description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        tableName: 'doc_type_master',
        timestamps: true
    });
    return DocTypeMaster;
};  
