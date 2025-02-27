const { AddressTypeMaster } = require('../../models'); // Adjust import based on actual file structure

// Get an address by company Id
exports.getAddressTypeDropDown = async (req, res, next) => {
    try {
        const addressType = await AddressTypeMaster.findAll({
            attributes: ['address_type_id', 'address_type_name']
        });
        res.status(200).json(addressType);
    } catch (err) {
        next(err)
    }
};

// // Update an address by ID
// exports.updateAddress = async (req, res) => {
//     try {
//         const [updated] = await AddressMaster.update(req.body, {
//             where: { address_id: req.params.id }
//         });
//         if (updated) {
//             const updatedAddress = await AddressMaster.findByPk(req.params.id);
//             res.status(200).json(updatedAddress);
//         } else {
//             res.status(404).json({ error: 'Address not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Delete an address by ID
// exports.deleteAddress = async (req, res) => {
//     try {
//         const deleted = await AddressMaster.destroy({
//             where: { address_id: req.params.id }
//         });
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ error: 'Address not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
