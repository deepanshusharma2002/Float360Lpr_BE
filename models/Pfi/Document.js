module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    "document",
    {
      document_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      linked_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      table_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      doc_name: {
        type: DataTypes.STRING(155),
        allowNull: true,
      },
      doc_base64: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(155),
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
      tableName: "document",
      timestamps: false,
    }
  );

  document.associate = (models) => {
    document.belongsTo(models.form_m, {
      foreignKey: 'linked_id',
      constraints: false
    });
    document.belongsTo(models.insurance, {
      foreignKey: 'linked_id',
      constraints: false
    });
    document.belongsTo(models.letter_of_credit, {
      foreignKey: 'linked_id',
      constraints: false
    });
    document.belongsTo(models.son_pfi, {
      foreignKey: 'linked_id',
      constraints: false
    });
  };

  return document;
};
