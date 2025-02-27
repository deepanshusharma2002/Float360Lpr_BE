const db = require('../models');
const { department: Dept, DeptDesigMapping } = db;


// Controller method to fetch all items
const getAllDept = async (req, res) => {
    try {
        const items = await Dept.findAll();           
        res.status(200).json(items);

    } catch (err) {
        // console.error('Error fetching items:', err);
        // res.status(500).json({ error: 'Error fetching items' });
        next(err)
    }
};


// Controller method to fetch item by id
const getDeptById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Dept.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (err) {
        // console.error(`Error fetching item with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching item' });
        next(err)
    }
};




// Controller method to delte item by id
const deleteDeptById = async (req, res) => {
    const itemid = req.params.id;
    try {
        const item = await Dept.findByPk(itemid);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.destroy()
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        // console.error(`Error fetching item with id ${itemid}:`, err);
        // res.status(500).json({ error: 'Error fetching item' });
        next(err)
    }
};


// Controller method to delte item by id
const createDept = async (req, res) => {
    try {
        const { dept_name } = req.body;
        const newItem = await Dept.create({ dept_name });
        res.status(201).json(newItem);
    } catch (err) {
        // console.error('Error creating item:', err);
        // res.status(500).json({ error: 'Error creating item' });
        next(err)
    }
};

// get designation by departmnets maped
const getDesignation = async (req, res, err) => {
    try {
        const dept_id = req.query.dept_id;
        const desig_id_list = await DeptDesigMapping.findAll({
            where: {
                dept_id: {
                    [Op.eq]: dept_id
                }
            },
            attributes: ['designation_id']
        })
        res.status(200).json(...desig_id_list);
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllDept,
    getDeptById,
    deleteDeptById,
    createDept,
    getDesignation
};





