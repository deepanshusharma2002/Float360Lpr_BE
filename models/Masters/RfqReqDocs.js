module.exports = (sequelize, DataTypes) => {
    const rfq_req_doc_master = sequelize.define(
      "rfq_req_doc_master",
      {
        rfq_req_doc_master_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        rfq_req_doc_master_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          rfq_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        tableName: "rfq_req_doc_master",
        timestamps: false,
      }
    );
  
    return rfq_req_doc_master;
  };
  