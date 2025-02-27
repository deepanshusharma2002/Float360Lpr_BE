const { Op } = require('sequelize');
const { PackageTypeMaster } = require('../models'); // Adjust the path as necessary

// Create a new package type
exports.createPackageType = async (req, res) => {
    try {
        const { package_type, package_type_description, created_by, status } = req.body;
        const packageType = await PackageTypeMaster.create({
            package_type,
            package_type_description,
            created_by,
            status
        });
        res.status(201).json({ msg: 'Package type created successfully', data: packageType });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all package types
exports.getAllPackageTypes = async (req, res) => {
    try {
        const packageTypes = await PackageTypeMaster.findAll({
            where: { status: { [Op.ne]: 0 } } // Assuming 0 means deleted
        });
        res.status(200).json(packageTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get a package type by ID
exports.getPackageTypeById = async (req, res) => {
    try {
        const packageType = await PackageTypeMaster.findByPk(req.params.id);
        if (packageType) {
            res.status(200).json(packageType);
        } else {
            res.status(404).json({ message: 'Package type not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a package type by ID
exports.updatePackageType = async (req, res) => {
    try {
        const packageType = await PackageTypeMaster.findByPk(req.params.id);
        if (packageType) {
            await packageType.update(req.body);
            res.status(200).json({ msg: 'Package type updated successfully', data: packageType });
        } else {
            res.status(404).json({ message: 'Package type not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Soft delete a package type by ID
exports.deletePackageType = async (req, res) => {
    try {
        const packageType = await PackageTypeMaster.findByPk(req.params.id);
        if (packageType) {
            await packageType.update({ status: 0 }); // Assuming 0 means deleted
            res.status(200).json({ message: 'Package type deleted successfully' });
        } else {
            res.status(404).json({ message: 'Package type not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
