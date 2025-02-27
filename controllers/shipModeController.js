
const db = require('../models')
const { ShipMode: ShipmentMode } = db
const { Op } = require('sequelize');


// Create a new shipment mode
const createShipmentMode = async (req, res, next) => {
    try {
        const {
            shipment_mode_name, status
        } = req.body;
        const result = await ShipmentMode.create({
            shipment_mode_name,
            status
        });
        return res.status(201).json({ message: "Submit Successfully" });
    } catch (err) {
        next(err)
    }
};

// Get a shipment mode by ID
const getAllShipmentModeDropdown = async (req, res, next) => {
    try {
            const result = await ShipmentMode.findAll({
                where: {
                    status: { [Op.eq]: 1 }
                },
                order: [['shipment_mode_name', 'ASC']],
                attributes: [ 'shipment_mode_id', 'shipment_mode_name'],
            });
           return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get all shipment modes
const getAllShipmentModes = async (req, res, next) => {
    const shipment_mode_id = req.query.shipment_mode_id;
    try {
        if (!shipment_mode_id) {
            const result = await ShipmentMode.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['shipment_mode_id', 'DESC']]
            });
           return res.status(200).json(result);
        } else {
            const result = await ShipmentMode.findByPk((shipment_mode_id),{
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

// Update a shipment mode
const updateShipmentMode = async (req, res, next) => {
    const shipment_mode_id = req.query.shipment_mode_id;

    try {
        // Find the shipment mode by primary key
        const shipmentMode = await ShipmentMode.findByPk(shipment_mode_id);

        if (!shipmentMode) {
            // Handle the case where the shipment mode is not found
            return res.status(404).json({ message: "Shipment mode not found" });
        }

        // Update the shipment mode
        const { shipment_mode_name, status } = req.body;
        await shipmentMode.update({
            shipment_mode_name,
            status
        });

        res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err);
    }
};

// Delete a shipment mode
const deleteShipmentMode = async (req, res, next) => {
    const shipment_mode_id = req.query.shipment_mode_id;
    try {
        const result = await ShipmentMode.update({ status: 0 }, {
            where: {
                shipment_mode_id: shipment_mode_id
            }
        });
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


module.exports = {
    createShipmentMode,
    getAllShipmentModeDropdown,
    getAllShipmentModes,
    updateShipmentMode,
    deleteShipmentMode
};
