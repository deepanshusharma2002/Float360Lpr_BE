// const category_master = require('../models/category_master');
const db = require('../models'); // Adjust the path according to your project structure
const { CategoryMaster } = db



// Controller method to fetch all category
const getAllCategory = async (req, res, next) => {
    try {
        const items = await CategoryMaster.findAll({ attributes: ['category_name'] });
        res.status(200).json(items);
    } catch (err) {
        next(err)
    }
};


// Controller method to fetch categort by id
const getCategoryById = async (req, res, next) => {
    const itemid = req.params.id;
    try {
        const item = await CategoryMaster.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'category not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        next(err)
    }
};


// Create a new category
const createCategory = async (req, res, next) => {
    try {
        // const { category_name, created_by } = req.body;
        const newItem = await CategoryMaster.create(req.body)
        res.status(201).json(newItem);
    } catch (err) {
        // console.log({ "category creation error": err });
        // res.status(500).json({ error: 'Error category creation item' });
        next(err)
    }
}


// Update a category
// async function updateCategory(id) {
//         await db.CategoryMaster.update({ status: 'inactive' }, {
//             where: {
//                 category_id: id
//             }
//         });
//     }

// Controller method to delte item by id

const deleteCategory = async (req, res, next) => {
    const itemid = req.params.id;
    try {
        const item = await CategoryMaster.findByPk(itemid);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        item.destroy()
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        // console.error(`Error fetching category with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching category' });
        next(err)
    }
};



module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    deleteCategory
}

