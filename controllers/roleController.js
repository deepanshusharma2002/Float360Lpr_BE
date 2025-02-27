// const db = require('../models');
// const { role: Role } = db


// // Controller method to fetch all items
// const getAllRole = async (req, res) => {
//     try {
//         const items = await Role.findAll({ attributes: ['role_id', 'role_name'] });
//         res.status(200).json(items);

//     } catch (err) {
//         // console.error('Error fetching items:', err);
//         // res.status(500).json({ error: 'Error fetching items' });
//         next(err);
//     }
// };


// // Controller method to fetch item by id
// const getRoleById = async (req, res) => {
//     const itemid = req.params.id;
//     try {
//         const item = await Role.findByPk(itemid);

//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }

//         res.status(200).json(item);
//     } catch (err) {
//         // console.error(`Error fetching item with id ${itemid}:`, err);
//         // res.status(500).json({ error: 'Error fetching item' });
//         next(err);
//     }
// };




// // Controller method to delte item by id
// const deleteRoleById = async (req, res) => {
//     const itemid = req.params.id;
//     try {
//         const item = await Role.findByPk(itemid);

//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }

//         item.destroy()
//         res.status(200).json({ message: 'Item deleted successfully' });
//     } catch (err) {
//         // console.error(`Error fetching item with id ${itemid}:`, err);
//         // res.status(500).json({ error: 'Error fetching item' });
//         next(err);
//     }
// };


// // Controller method to delte item by id
// const createRole = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { role_name } = req.body;
//         const newItem = await Role.create({ role_name });
//         res.status(201).json(newItem);
//     } catch (err) {
//         // console.error('Error creating item:', err);
//         // res.status(500).json({ error: 'Error creating item' });
//         next(err);
//     }
// };




// module.exports = {
//     getAllRole,
//     getRoleById,
//     deleteRoleById,
//     createRole
// };


const { Op } = require('sequelize');
const db = require('../models');
const { role: Role } = db;



// Controller method to fetch roles based on the presence of role_id in query
exports.getAllRole = async (req, res, next) => {
    const roleId = req.query.role_id; // Use query parameter to find specific role

    try {
        // Construct the `where` condition based on the presence of `roleId`
        const whereCondition = roleId
            ? { role_id: roleId, status: { [Op.ne]: 0 } } // Find specific role if ID is provided
            : { status: { [Op.ne]: 0 } }; // Get all roles if no ID is provided

        // Fetch roles based on the `whereCondition`
        const roles = await Role.findAll({ where: whereCondition });

        // Check if a specific role was requested but not found
        if (roleId && roles.length === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }

        // Return the roles or the specific role
        res.status(200).json(roles);
    } catch (err) {
        next(err);
    }
};

// Controller method to create a new role
exports.createRole = async (req, res, next) => {
    try {
        const { role_name, status } = req.body;
        const newItem = await Role.create(req.body);
        res.status(201).json({ message: 'Role created successfully', data: newItem });
    } catch (err) {
        next(err);
    }
};

// Controller method fro role drop down
exports.getRoleDropDown = async (req, res, next) => {
    try {
        const roles = await Role.findAll({
            attributes: ['role_id', 'role_name'],
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(roles);
    } catch (err) {
        next(err);
    }
};

// Controller method to update a role by ID
exports.updateRoleById = async (req, res, next) => {
    const roleId = req.query.role_id;
    const { role_name, updated_by } = req.body;
    try {
        // Find the role by primary key
        const role = await Role.findByPk(roleId);
        if (!role || role.status === 0) { // Check for soft deleted roles
            return res.status(404).json({ error: 'Role not found' });
        }
        // Update the role
        const updatedRole = await role.update(req.body);

        res.status(200).json({ message: 'Role updated successfully', data: updatedRole });
    } catch (err) {
        next(err);
    }
};


// Controller method to soft delete a role by ID
exports.deleteRoleById = async (req, res, next) => {
    const roleId = req.query.role_id;
    try {
        const role = await Role.findByPk(roleId);
        if (!role || role.status === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        await role.update({ status: 0 });
        res.status(200).json({ message: 'Role delted successfully' });
    } catch (err) {
        next(err);
    }
};

