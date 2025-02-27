const db = require("../models");
const {
  vendor: Vendor,
  VendorsMaster,
  company_master,
  VendorsBanksDetailsMaster,
  VendorsAddressDetailsMaster,
} = db;
const { generateSeries } = require("../utilites/genrateSeries");

// Function to fetch all vendors with associated bank and address details *getAllVendorsDetails*
getAllVendor = async (req, res) => {
  try {
    // Find all vendors
    const vendors = await VendorsMaster.findAll({
      attributes: {
        exclude: ["last_audited_docs"],
      },
    });
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors details:", err);
    res.status(500).json({ error: "Failed to fetch vendors details" });
  }
};

// Controller method to fetch item by id
const getVendorById = async (req, res, next) => {
  const vendro_id = req.params.id;
  try {
    if (!vendro_id) {
      return res.status(404).json({ error: "Item not found" });
    }
    const result = await VendorsMaster.findByPk(vendro_id, {
      include: [{ model: db.VendorsAddressDetailsMaster }],
      attributes: {
        exclude: ["last_audited_docs"],
      },
    });
    if (!result) {
      return { message: "Vendor not found" };
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// bankDrop down
const getAllBankDropDn = async (req, res) => {
  try {
    // Find all vendors
    const banksdropdn = await VendorsBanksDetailsMaster.findAll({
      // attributes: ["v_banks_detail_id", "bank_name"],
    });
    res.json(banksdropdn);
  } catch (err) {
    console.error("Error fetching vendors details:", err);
    res.status(500).json({ error: "Failed to fetch vendors details" });
  }
};

// Controller method to delte item by id
const deleteVendorById = async (req, res) => {
  const itemid = req.params.id;
  try {
    const item = await Vendor.findByPk(itemid);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    // console.error(`Error fetching item with id ${itemid}:`, err);
    // res.status(500).json({ error: 'Error fetching item' });
    next(err);
  }
};

const createVendor = async (req, res, next) => {
  const { vendorDetails, bankDetails, addressDetails } = req.body;
  console.log(req.body);
  try {
    const doc_code = "VEN";
    const vendor_series = (await generateSeries(doc_code)) || "ven-000-ven";
    vendorDetails.vendor_series = vendor_series;
    vendorDetails.last_audited_docs_name = req?.files[0]?.originalname || " ";
    vendorDetails.last_audited_docs = await req?.files[0]?.buffer?.toString(
      "base64"
    );

    const newVendor = await VendorsMaster.create(vendorDetails);

    await addressDetails.forEach((data) => {
      data.vendor_id = newVendor.vendor_id;
    });

    await bankDetails.forEach((data, i) => {
      data.vendor_id = newVendor.vendor_id;
      data.bank_ref_cheque_name = req?.files[i + 1]?.originalname || " ";
      data.bank_ref_cheque = req?.files[i + 1]?.buffer?.toString("base64");
      i++;
    });

    const newBankDetails = await VendorsBanksDetailsMaster.bulkCreate(
      bankDetails
    );
    const newAddressDetails = await VendorsAddressDetailsMaster.bulkCreate(
      addressDetails
    );

    res.status(201).json({
      message: "Vendor created successfully",

      vendor: newVendor,
      vendor2: vendorDetails,
      bankDetails: newBankDetails,
      addressDetails: newAddressDetails,
    });
  } catch (err) {
    console.error("Error creating vendor:", err);
    next(err);
  }
};

module.exports = {
  getAllVendor,
  getVendorById,
  getAllBankDropDn,
  deleteVendorById,
  createVendor,
};
