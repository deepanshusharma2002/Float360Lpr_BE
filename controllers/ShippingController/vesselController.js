const { VesselDetails } = require('../../models'); // Make sure the path is correct

// Create a new Vessel
exports.createVessel = async (req, res) => {
    try {
        const vessel = await VesselDetails.create(req.body);
        res.status(201).json({ message: 'Vessel created successfully', data: vessel });
    } catch (error) {
        res.status(500).json({ message: 'Error creating vessel', error: error.message });
    }
};

// Get all Vessels
exports.getAllVessels = async (req, res) => {
    try {
        const vessels = await VesselDetails.findAll();
        res.status(200).json(vessels);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving vessels', error: error.message });
    }
};

// Get a single Vessel by shipping id
exports.getVesselByShipId = async (req, res, next) => {
    try {
        const { shipping_id } = req.body;
        const vessel = await VesselDetails.findAll({ where: shipping_id });
        if (vessel) {
            res.status(200).json(vessel);
        } else {
            res.status(404).json({ message: 'Vessel not found' });
        }
    } catch (error) {
        next(error)
    }
};

// Update a Vessel by ID
exports.updateVessel = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await VesselDetails.update(req.body, { where: { vessel_id: id } });
        if (updated) {
            const updatedVessel = await VesselDetails.findByPk(id);
            res.status(200).json({ message: 'Vessel updated successfully', data: updatedVessel });
        } else {
            res.status(404).json({ message: 'Vessel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating vessel', error: error.message });
    }
};

// Delete a Vessel by ID
exports.deleteVessel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await VesselDetails.destroy({ where: { vessel_id: id } });
        if (deleted) {
            res.status(200).json({ message: 'Vessel deleted successfully' });
        } else {
            res.status(404).json({ message: 'Vessel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vessel', error: error.message });
    }
};
