const express = require('express');
const router = express.Router();
const ItemSubcategoryMaster = require('../models').SubCategoryMaster; // Assuming your model is properly exported from '../models'

// Get all subcategories
// const getAllSubcategories = async (req, res) => {

//     try {
//         const subcategories = await ItemSubcategoryMaster.findAll({ attibutes: ['subcategory_name'] });
//         res.json(subcategories);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };


const getAllSubcategories = async (req, res) => {
    const { parentcategory_name } = req.query; // Assuming you pass parentcategory_code as a query parameter

    try {
        let queryOptions = {
            attributes: ['subcategory_name']
        };

        if (parentcategory_name) {
            queryOptions.where = { parentcategory_name };
        }

        const subcategories = await ItemSubcategoryMaster.findAll(queryOptions);
        res.json(subcategories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Add a new subcategory
const addSubcategory = async (req, res) => {
    try {
        const newSubcategory = await ItemSubcategoryMaster.create(req.body);
        res.status(201).json(newSubcategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a subcategory
const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSubcategory = await ItemSubcategoryMaster.update(req.body, {
            where: { item_subcategory_id: id }
        });
        res.json(updatedSubcategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a subcategory
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        await ItemSubcategoryMaster.destroy({
            where: { item_subcategory_id: id }
        });
        res.json({ message: 'Subcategory deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Define your routes
router.get('/subcategories', getAllSubcategories);
router.post('/subcategories', addSubcategory);
router.put('/subcategories/:id', updateSubcategory);
router.delete('/subcategories/:id', deleteSubcategory);

module.exports = router;
