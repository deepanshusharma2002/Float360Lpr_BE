const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const series_master = sequelize.define("series_master", {
        series_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          doc_code: {
            type: DataTypes.STRING(255),
            allowNull: true
          },
          prefix: {
            type: DataTypes.STRING(55),
            allowNull: true
          },
          range_start: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          range_end: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          suffix: {
            type: DataTypes.STRING(55),
            allowNull: true
          },
          additional: {
                type: DataTypes.STRING(55),
                allowNull: true
          },
          int_ext: {
            type: DataTypes.STRING(55),
            allowNull: true
          },
          current_num: {
            type: DataTypes.STRING(55),
            allowNull: true
          },
          series_status: {
            type: DataTypes.STRING(50),
            allowNull: true
          },
          validity: {
            type: DataTypes.STRING(50),
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
            type: DataTypes.STRING(50),
            allowNull: true
          }
        }, {
          tableName: 'series_master', 
          timestamps: false 
        });

    return series_master;
};
