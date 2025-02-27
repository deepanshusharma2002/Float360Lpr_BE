const { AddressMaster, CompanyMaster } = require('../../models'); // Adjust import based on actual file structure
const { Op } = require('sequelize')
// Get an address by company Id
exports.getAddressByCompanyId = async (req, res, next) => {
    try {
        const { entity_id } = req.query;
        const address = await AddressMaster.findAll({
            where: {
                entity_id: entity_id,
                status: {
                    [Op.ne]: 0
                }
            },
            attributes: [
                "address_id",
                "address_type",
                "entity_type",
                "address_line1",
                "address_line2",
                "city",
                "state",
                "postal_code"
            ]
        });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (err) {
        next(err)
    }
};

// Update an address by ID
exports.updateAddress = async (req, res) => {
    try {
        const [updated] = await AddressMaster.update(req.body, {
            where: { address_id: req.params.id }
        });
        if (updated) {
            const updatedAddress = await AddressMaster.findByPk(req.params.id);
            res.status(200).json(updatedAddress);
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an address by ID
exports.deleteAddress = async (req, res) => {
    try {
        const deleted = await AddressMaster.destroy({
            where: { address_id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
