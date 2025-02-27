module.exports = (sequelize, DataTypes) => {
    const pack_info = sequelize.define(
        "pack_info",
        {
            pack_info_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            shippment_advise_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            ci_num: {
                type: DataTypes.STRING(150),
                allowNull: true,
            },
            ci_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            reference_table_name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            no_of_package: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            package_type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            l_input: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            b_input: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            h_input: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            net_wt_of_package: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gr_wt_of_package: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            cbm: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            remark: {
                type: DataTypes.STRING,
                allowNull: true, // Remark can be optional
            },
            created_on: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            created_by: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            updated_on: {
                type: DataTypes.DATE,
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
            tableName: "pack_info",
            timestamps: false,
        }
    );

    return pack_info;
};
