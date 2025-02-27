const { VendorTypeMaster } = require('../models'); // Adjust the path as necessary

// Create a new Vendor Type
exports.createVendorType = async (req, res) => {
    try {
        const vendorType = await VendorTypeMaster.create(req.body);
        res.status(201).json(vendorType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create vendor type' });
    }
};

// Get all Vendor Types
exports.getVtypefodropdown = async (req, res) => {
    try {
        const vendorTypes = await VendorTypeMaster.findAll({
            attributes:['v_type_id','type_name']
        });
        res.status(200).json(vendorTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve vendor types' });
    }
};


// Get all Vendor Types
exports.getAllVendorTypes = async (req, res) => {
    try {
        const vendorTypes = await VendorTypeMaster.findAll();
        res.status(200).json(vendorTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve vendor types' });
    }
};

// Get a single Vendor Type by ID
exports.getVendorTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorType = await VendorTypeMaster.findByPk(id);
        if (vendorType) {
            res.status(200).json(vendorType);
        } else {
            res.status(404).json({ error: 'Vendor type not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve vendor type' });
    }
};

// Update a Vendor Type by ID
exports.updateVendorType = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await VendorTypeMaster.update(req.body, {
            where: { v_type_id: id }
        });
        if (updated) {
            const updatedVendorType = await VendorTypeMaster.findByPk(id);
            res.status(200).json(updatedVendorType);
        } else {
            res.status(404).json({ error: 'Vendor type not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update vendor type' });
    }
};

// Delete a Vendor Type by ID
exports.deleteVendorType = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await VendorTypeMaster.destroy({
            where: { v_type_id: id }
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ error: 'Vendor type not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete vendor type' });
    }
};
