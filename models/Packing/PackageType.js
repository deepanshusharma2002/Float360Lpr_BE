module.exports = (sequelize, DataTypes) => {
    const packageTypeMaster = sequelize.define(
        "package_type_master",
        {
            package_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            package_type: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            package_type_descriptoin: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            created_by: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            updated_by: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: "package_type_master",
            timestamps: false,
        }
    );

    return packageTypeMaster;
};
