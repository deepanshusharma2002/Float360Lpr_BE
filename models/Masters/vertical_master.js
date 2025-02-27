module.exports = (sequelize, DataTypes) => {
    const Vertical = sequelize.define("vertical_opr", {
        vertical_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vertical_name: {
            type: DataTypes.STRING(100),
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
        }
    }, {
        tableName: 'vertical_master',
        timestamps: true
    });

    //associatoin
    Vertical.associate = (models) => {
        Vertical.hasMany(models.OprMaster, { foreignKey: 'vertical_id' });
    };

    return Vertical;
};
