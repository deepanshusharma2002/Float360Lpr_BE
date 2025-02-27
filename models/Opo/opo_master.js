
module.exports = (sequelize, DataTypes) => {
    const opo_master = sequelize.define("opo_master", {
        opo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        opo_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        quo_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quo_num: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        acceptance_remarks: {
            type: DataTypes.STRING(255),
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
        tableName: 'opo_master',
        timestamps: false
    });

    opo_master.associate = (models) => {
        opo_master.hasOne(models.po_master, {
          foreignKey: "opo_ids",
        });
      };


    return opo_master;
};
