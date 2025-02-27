
module.exports = (sequelize, DataTypes) => {
    const delivery_terms_quo = sequelize.define("delivery_terms_quo", {
        delivery_terms_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        delivery_terms_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'delivery_terms_quo',
        timestamps: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on'
    });

    return delivery_terms_quo;
};
