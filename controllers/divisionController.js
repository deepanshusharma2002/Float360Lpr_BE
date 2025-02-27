// const db = require('../models');
// const { Division } = db;


// const getAllDivision = async (req, res) => {
//     try {

//         const items = await Division.findAll({
//             order: [
//                 ['createdAt', 'DESC']]
//         });
//         res.status(200).json(items);

//     } catch (err) {
//         next(err);
//     }
// };



// const getDivisionById = async (req, res) => {
//     const itemid = req.params.id;
//     try {
//         const item = await Division.findByPk(itemid);

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



// const deleteDivisionById = async (req, res) => {
//     const itemid = req.params.id;
//     try {
//         const item = await Division.findByPk(itemid);

//         if (!item) {
//             return res.status(404).json({ error: 'Item not found' });
//         }

//         item.destroy()
//         res.status(200).json({ message: 'Item deleted successfully' });
//     } catch (err) {
//         // console.error(`Error fetching item with id ${itemid}:`, err);
//         // res.status(500).json({ error: 'Error fetching item' });
//         next(err)
//     }
// };


// const createDivision = async (req, res, next) => {
//     try {
//         const { division_name, status } = req.body;
//         const newItem = await Division.create(req.body);
//         res.status(201).json({ message: 'Division Created Sucessfully' });

//     } catch (err) {
//         // console.error('Error creating item:', err);
//         // res.status(500).json({ error: 'Error creating item' });
//         next(err);
//     }
// };




// const updateDivision = async (req, res, next) => {
//     try {
//         const { division_id } = req.query;
//         const { division_name, status, updated_by } = req.body;

//         const [updated] = await Division.update(
//             { division_name, status, updated_by },
//             {
//                 where: { division_id },
//                 returning: true
//             }
//         );

//         if (updated) {
//             const updatedDivision = await Division.findByPk(division_id);

//             res.status(200).json({
//                 message: 'Division Updated Successfully',
//                 data: updatedDivision
//             });

//         } else {
//             res.status(404).json({ message: 'Division not found' });
//         }
//     } catch (err) {
//         next(err);
//     }
// };



// module.exports = {
//     getAllDivision,
//     getDivisionById,
//     deleteDivisionById,
//     createDivision,
//     updateDivision
// };



const db = require('../models');
const { Division } = db;
const { Op } = require('sequelize');

// Controller method to fetch all items
const getAllDivision = async (req, res, next) => {
    try {
        const items = await Division.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { status: { [Op.ne]: 0 } }
        });
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

const getDivisionDropDn = async (req, res, next) => {
    try {
        const items = await Division.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: { status: { [Op.ne]: 0 } },
            attributes: ['division_id', 'division_name']
        });
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

// Controller method to fetch item by id
const getDivisionById = async (req, res, next) => {
    const itemid = req.params.id;
    try {
        const item = await Division.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
};

// Controller method to create a new Division
const createDivision = async (req, res, next) => {
    try {
        const { division_name, status } = req.body;
        const newItem = await Division.create(req.body);
        res.status(201).json({ message: 'Division created successfully', data: newItem });
    } catch (err) {
        next(err);
    }
};

// Controller method to update Division
const updateDivision = async (req, res, next) => {
    const itemId = req.query.division_id
    const updatedData = req.body;

    try {
        const item = await Division.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Division not found' });
        }
        await item.update(updatedData);
        res.status(200).json({ message: 'Division updated successfully', data: item });
    } catch (err) {
        next(err);
    }
};

// Controller method to delete Division (soft delete by setting status to 0)
const deleteDivisionById = async (req, res, next) => {
    const itemId = req.query.division_id

    try {
        const item = await Division.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Division not found' });
        }

        // Set status to 0 instead of deleting the record
        await item.update({ status: 0 });

        res.status(200).json({ message: 'Division deleted successfully', data: item });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllDivision,
    getDivisionById,
    deleteDivisionById,
    createDivision,
    getDivisionDropDn,
    updateDivision
};
