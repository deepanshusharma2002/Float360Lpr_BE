const db = require('../models'); // Adjust the path according to your project structure
let { CategoryMaster: Itemcategory } = db
const { Op } = require('sequelize');

// Create a new item category
const createItemCategory = async (req, res, next) => {
    try {
        const {
            category_code, category_name, category_description, status
        } = req.body;
        const result = await Itemcategory.create({
            category_code, category_name, category_description, status, created_by: "Admin", updated_by: "Admin"
        });
        res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

// Get all item categories
const getAllItemCategories = async (req, res, next) => {
    const item_category_id = req.query.item_category_id;
    try {
        if (!item_category_id) {
            const result = await Itemcategory.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['item_category_id', 'DESC']]
            });
            res.status(200).json(result);
        } else {
            const result = await Itemcategory.findAll({
                where: {
                    item_category_id: item_category_id,
                    status: { [Op.ne]: 0 }
                },
                order: [['item_category_id', 'DESC']]
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};


// Update an item category by ID
// const updateItemCategory = async (req, res, next) => {
//     try {
//         const [updated] = await Itemcategory.update(req.body, {
//             where: { item_category_id: req.params.id }
//         });
//         if (updated) {
//             const updatedItemCategory = await Itemcategory.findByPk(req.params.id);
//             res.status(200).json(updatedItemCategory);
//         } else {
//             res.status(404).json({ error: 'Item category not found' });
//         }
//     } catch (error) {
//         next(error)
//     }
// };
const updateItemCategory = async (req, res, next) => {
    const item_category_id = req.query.item_category_id;
    try {
        const {
            category_code, category_name, category_description, status
        } = req.body;
        const result = await Itemcategory.update({
            category_code, category_name, category_description, status
        }, {
            where: {
                item_category_id: item_category_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};


// Delete an item category by ID  
// After deltion item still in data base but status of category  turn into zero
const deleteItemCategory = async (req, res, next) => {
    const item_category_id = req.query.item_category_id;
    try {
        const result = await Itemcategory.update({ status: 0 }, {
            where: {
                item_category_id: item_category_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


module.exports = {
    createItemCategory,
    getAllItemCategories,
    updateItemCategory,
    deleteItemCategory,
};
