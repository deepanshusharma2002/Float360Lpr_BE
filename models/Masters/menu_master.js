// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const MenuMaster = sequelize.define('MenuMaster', {
//     menu_id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     mcode: {
//         type: DataTypes.STRING(25),
//         allowNull: true
//     },
//     mtext: {
//         type: DataTypes.STRING(55),
//         allowNull: true
//     },
//     mlevel: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     type: {
//         type: DataTypes.STRING(55),
//         allowNull: true
//     },
//     parent_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     status: {
//         type: DataTypes.STRING(50),
//         allowNull: true
//     },
//     created_by: {
//         type: DataTypes.STRING(55),
//         allowNull: true
//     },
//     updated_by: {
//         type: DataTypes.STRING(55),
//         allowNull: true
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: true
//     }
// }, {
//     tableName: 'menu_master', // Specify the table name explicitly
//     timestamps: false // Disable timestamps if not used in the table
// });

// module.exports = MenuMaster;


module.exports = (sequelize, DataTypes) => {
    const menu = sequelize.define('MenuMaster', {
        menu_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        mcode: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        mtext: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        mlevel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'menu_master', // Specify the table name explicitly
        timestamps: true, // Disable timestamps if not used in the table
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    })
    return menu;
};

