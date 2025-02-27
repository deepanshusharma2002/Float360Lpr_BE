module.exports = (sequelize, DataTypes) => {
    const GrnMaster = sequelize.define(
        "GrnMaster",
        {
            grn_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            grn_num: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            buying_house_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            po_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            vendor_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            created_by: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            updated_by: {
                type: DataTypes.STRING(50),
                allowNull: true,
            }
        },
        {
            tableName: "gnr_master",
            timestamps: true,
        }
    );

    return GrnMaster;
};
