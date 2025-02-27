// module.exports = (sequelize, DataTypes) => {
//   const Container = sequelize.define('Container', {
//     container_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     shipping_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     container_num: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     size: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     type: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     seal_no: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     arrival_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     freedays_ending_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     discharge_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     transfer_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     tdo_validity_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     created_by: {
//       type: DataTypes.STRING(55),
//       allowNull: true
//     },
//     updated_by: {
//       type: DataTypes.STRING(55),
//       allowNull: true
//     }
//   }, {
//     tableName: 'containers_details',
//     timestamps: true,
//   });

//   return Container;
// }





module.exports = (sequelize, DataTypes) => {
  const Container = sequelize.define('Container', {
    container_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    shipping_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    container_num: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seal_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    freedays_ending_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    discharge_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    transfer_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    tdo_validity_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fixed_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    storage_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING(55),
      allowNull: true,
    }
  }, {
    tableName: 'containers_details',
    timestamps: true,
  });

  return Container;
};
