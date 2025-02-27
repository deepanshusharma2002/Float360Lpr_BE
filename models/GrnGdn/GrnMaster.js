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
            gdn_master_id: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            agency_code: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            agency_id: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            ref_doc: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            ref_doc_id: {
                type: DataTypes.STRING(55),
                allowNull: true
            },
            status: {
                type: DataTypes.STRING(50),
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
            tableName: " grn_master",
            timestamps: true,
        }
    );

    // Association
    GrnMaster.associate = (models) => {
        GrnMaster.hasMany(models.GdnItems, { foreignKey: 'grn_master_id' });
    };

    return GrnMaster;
};
