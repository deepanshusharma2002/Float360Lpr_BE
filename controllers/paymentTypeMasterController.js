const { PaymentTypeMaster } = require('../models'); // Adjust the path to your models file
const { Op } = require('sequelize');

//  Create a new PaymentTypeMaster
exports.createPaymentTypeMaster = async (req, res, next) => {
    try {
        const {
            payment_type_name, status
        } = req.body;
        const result = await PaymentTypeMaster.create({
            payment_type_name,
            status
        });
        return res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};



// Get all PaymentTypeMaster records
exports.getAllPaymentTypeDropdown = async (req, res) => {
    try {
        const paymentTypes = await PaymentTypeMaster.findAll({
            where: {
                status: { [Op.eq]: 1 }
            },
            order: [['payment_type_name', 'ASC']],
            attributes: [ 'payment_type_id', 'payment_type_name'],
        });
        res.status(200).json(paymentTypes);
    } catch (error) {
        console.error('Error fetching PaymentTypeMasters:', error);
        res.status(500).json({ error: 'An error occurred while fetching PaymentTypeMasters.' });
    }
};

// Get a PaymentTypeMaster
exports.getPaymentTypeMasterById = async (req, res, next) => {
    const payment_type_id = req.query.payment_type_id;
    try {
        if (!payment_type_id) {
            const result = await PaymentTypeMaster.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['payment_type_id', 'DESC']]
            });
           return res.status(200).json(result);
        } else {
            const result = await PaymentTypeMaster.findByPk((payment_type_id),{
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            return res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};

// Update a PaymentTypeMaster by ID
exports.updatePaymentTypeMaster = async (req, res, next) => {
    const payment_type_id = req.query.payment_type_id;

    try {
        const PaymentType = await PaymentTypeMaster.findByPk(payment_type_id);

        const { payment_type_name, status } = req.body;
        await PaymentType.update({
            payment_type_name,
            status
        });

        res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err);
    }
};

// Delete a PaymentTypeMaster by ID
exports.deletePaymentTypeMaster = async (req, res, next) => {
    const payment_type_id = req.query.payment_type_id;
    try {
        const result = await PaymentTypeMaster.update({ status: 0 }, {
            where: {
                payment_type_id: payment_type_id
            }
        });
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};
