// Assuming this is in department_master.js model file

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        dept_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dept_name: {
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
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        tableName: 'department_master', // Adjust table name if necessary
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    Department.associate = (models) => {
        Department.hasMany(models.OprMaster, { foreignKey: 'department_id' });
    };

    return Department;
};
