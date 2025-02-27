module.exports = (sequelize, DataTypes) => {
    const additional_remark = sequelize.define('additional_remark', {
        additional_remark_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        reference_table_name: {
            type: DataTypes.STRING(55),
            allowNull: true,
        },
        reference_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reference_num: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING(555),
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
    }, {
        tableName: 'additional_remark',
        timestamps: true,
    })
    return additional_remark;
};

