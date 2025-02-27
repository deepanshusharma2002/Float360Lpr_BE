// models/ApprovalMatrix.js
module.exports = (sequelize, DataTypes) => {
    const ApprovalMatrix = sequelize.define('ApprovalMatrix', {
        approval_matrix_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        module_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        approval_level: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'approval_matrix',
        timestamps: true
    });

    ApprovalMatrix.associate = (models) => {
        // ApprovalMatrix.belongsTo(models.User, { foreignKey: 'user_id' });
        ApprovalMatrix.belongsTo(models.user, {
                foreignKey: "user_id",
            });
    };

    return ApprovalMatrix;
};
