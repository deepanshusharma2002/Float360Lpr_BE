const { ServiceMaster } = require('../../models'); // Adjust the path as needed

// Create a new ServiceMaster
exports.createServiceMaster = async (req, res) => {
    try {
        const {service_name,service_code,service_type}= req.body;
        let service_series = 'S-0000-s'
        const serviceMaster = await ServiceMaster.create(req.body);
        res.status(201).json(serviceMaster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all ServiceMasters
exports.getAllServiceMasters = async (req, res) => {
    try {
        const serviceMasters = await ServiceMaster.findAll();
        res.status(200).json(serviceMasters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all ServiceMasters
exports.getAllServiceMastersDropDown = async (req, res) => {
    try {
        const serviceMasters = await ServiceMaster.findAll({
            attributes: ['service_id', 'service_name']
        });
        res.status(200).json(serviceMasters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single ServiceMaster by ID
exports.getServiceMasterById = async (req, res) => {
    try {
        const serviceMaster = await ServiceMaster.findByPk(req.params.id);
        if (serviceMaster) {
            res.status(200).json(serviceMaster);
        } else {
            res.status(404).json({ message: 'ServiceMaster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a ServiceMaster by ID
exports.updateServiceMaster = async (req, res) => {
    try {
        const serviceMaster = await ServiceMaster.findByPk(req.params.id);
        if (serviceMaster) {
            await serviceMaster.update(req.body);
            res.status(200).json(serviceMaster);
        } else {
            res.status(404).json({ message: 'ServiceMaster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a ServiceMaster by ID
exports.deleteServiceMaster = async (req, res) => {
    try {
        const serviceMaster = await ServiceMaster.findByPk(req.params.id);
        if (serviceMaster) {
            await serviceMaster.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'ServiceMaster not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
