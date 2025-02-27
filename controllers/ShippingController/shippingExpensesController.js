const { where } = require('sequelize');
const { ShippingExpenses } = require('../../models');

const shippingExpensesController = {
    // Create a new Shipping Expense
    create: async (req, res, next) => {
         console.log(req.body);
        try {
            const fileBuffer = req.file.buffer;
            const base64String = await fileBuffer.toString("base64");
            req.body.document_name = req.file.originalname
            req.body.document = base64String
            const newExpense = await ShippingExpenses.create(req.body);
            res.status(201).json({ message: 'Terminal Expenses Created Successfully', data: newExpense });
        } catch (error) {
            next(error)
        }
    },


    // Get all Shipping Expenses
    getAll: async (req, res) => {
        try {

            const expenses = await ShippingExpenses.findAll();
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Get a single Shipping Expense by ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const expense = await ShippingExpenses.findByPk(id);
            if (expense) {
                res.status(200).json(expense);
            } else {
                res.status(404).json({ message: 'Shipping expense not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    // Get a single Shipping Expense by shippingID
    getShippingById: async (req, res) => {
        try {
            const { shipping_id } = req.query;
            const expense = await ShippingExpenses.findAll({
                where: { shipping_id }
            });
            if (expense) {
                res.status(200).json(expense);
            } else {
                res.status(404).json({ message: 'Shipping expense not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a Shipping Expense by ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await ShippingExpenses.update(req.body, {
                where: { shipping_expenses_id: id }
            });

            if (updated) {
                const updatedExpense = await ShippingExpenses.findByPk(id);
                res.status(200).json(updatedExpense);
            } else {
                res.status(404).json({ message: 'Shipping expense not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete a Shipping Expense by ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await ShippingExpenses.destroy({
                where: { shipping_expenses_id: id }
            });

            if (deleted) {
                res.status(204).json({ message: 'Shipping expense deleted' });
            } else {
                res.status(404).json({ message: 'Shipping expense not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};



module.exports = shippingExpensesController;
