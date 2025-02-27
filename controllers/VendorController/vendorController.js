const db = require('../../models')
const { vendor: Vendor, VendorsMaster, sequelize, VendorsBanksDetailsMaster, AddressMaster } = db
const {generateSeries} = require('../../utilites/genrateSeries');


exports.createVendor2 = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { vendorData, bankDetails, addressData } = req.body;
        vendorData.vendor_series = await generateSeries('VEN') || 'ven-000-ven';
        vendorData.last_audited_docs_name = req.files[0].originalname;
        vendorData.last_audited_docs = await req.files[0].buffer.toString("base64");
        const newVendor = await VendorsMaster.create(vendorData, { transaction });
        const vendor_id = newVendor.vendor_id

        // transform addressData
        await addressData.forEach(data => {
            data.entity_id = vendor_id;
            data.entity_type = 'vendor';
            data.created_by = req.body.created_by;
        });

        // transform bankdata
        await bankDetails.forEach((data, i) => {
            data.created_by = req.body.created_by;
            data.vendor_id = vendor_id;
            data.bank_ref_cheque_name = req.files[i + 1].originalname;
            data.bank_ref_cheque = req.files[i + 1].buffer.toString("base64");
            i++;
        });

        await VendorsBanksDetailsMaster.bulkCreate(bankDetails, { transaction });
        await AddressMaster.bulkCreate(addressData, { transaction });

        await transaction.commit();

        res.status(201).json({ message: 'Vendor created successfully' });

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
};

