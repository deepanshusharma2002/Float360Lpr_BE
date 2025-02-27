module.exports = (sequelize, DataTypes) => {
    const GdnMaster = sequelize.define(
        "GdnMaster",
        {
            gdn_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            gdn_num: {
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
            tableName: "gdn_master",
            timestamps: true,
        }
    );

    // Association
    GdnMaster.associate = (models) => {
        GdnMaster.hasMany(models.GdnItems, { foreignKey: 'gdn_id' });
    };

    return GdnMaster;
};
