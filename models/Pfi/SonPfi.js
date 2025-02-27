module.exports = (sequelize, DataTypes) => {
  const son_pfi = sequelize.define(
    "son_pfi",
    {
      son_pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pfi_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pfi_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pfi_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ci_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ci_num: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      permit_type: {
        type: DataTypes.STRING(55),
        allowNull: true,
      },
      son_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      invoice_received_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      pay_not: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      permit_num: {
        type: DataTypes.STRING(255),
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
      tableName: "son_pfi",
      timestamps: false,
    }
  );


  son_pfi.associate = (models) => {
    son_pfi.hasMany(models.document, {
      foreignKey: 'linked_id',
    });

    son_pfi.belongsTo(models.Pfi_master, {
      foreignKey: 'pfi_id',  // Ensure this matches the foreign key in pfi_master
    });
  };

  return son_pfi;
};
