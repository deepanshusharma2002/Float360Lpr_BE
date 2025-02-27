// const { Pfi_master, PaymentRequestMaster, po_master, sequelize, Pfi_line_items, item, db } = require("../../models");
const formattedDateTime = require("../../middleware/time");
const { Op, where } = require("sequelize");
const { generateSeries } = require(".././seriesGenerate");
const { getQuotationItemByQuoId } = require('.././quotationItemsController');
const { Pfi_master: PfiMaster, document } = require("../../models");

// Create a new PFI Master record
exports.create = async (req, res) => {

    try {
        req.body.pfi_num = await generateSeries('PFI')
        const pfiMaster = await PfiMaster.create(req.body);
        res.status(201).json({ msg: 'PFI Created Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all PFI Master records
exports.pfilist = async (req, res) => {
    try {
        const pfiMasters = await PfiMaster.findAll({
            include: [
                { model: insurance },
                { model: form_m }
            ]
        });
        res.status(200).json(pfiMasters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retrieve all PFI Master records
exports.draftpfilist = async (req, res) => {
    try {
        const pfiMasters = await PfiMaster.findAll({
            where: { status: 1 }
        });
        res.status(200).json(pfiMasters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve all PFI Master records
exports.cnfrmpfilist = async (req, res) => {
    try {
        const pfiMasters = await PfiMaster.findAll({
            where: { status: 2 }
        });
        res.status(200).json(pfiMasters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retrieve all PFI Master records
exports.approvePfi = async (req, res) => {
    try {
        let { pfi_id, remarks } = req.body
        const updatedpfiMasters = await PfiMaster.update({ status: 1.2, approve_remarks: remarks }, { // 1.2 means approved by PH and pending by BH
            where: { pfi_id }
        });
        res.status(200).json({ status: 'success', data: updatedpfiMasters, message: "Pfi Approved Sucessfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.issuePFI = async (req, res) => {
    try {
        let { pfi_id, uploadDate } = req.body
        console.log("req.body", req.body);
        console.log("req.files", req.files);

        if (req.files && req.files.length > 0) {
            await Promise.all(
              req.files.map(async (file) => {
                const base64 = file.buffer.toString("base64");
                await document.create({
                  linked_id: pfi_id,
                  table_name: "pfi_master",
                  type: "PFI SIGNED COPY", 
                  doc_name: `${file.fieldname}-${file.originalname}`,
                  title: "Signed PFI Copy by BH",
                  doc_base64: base64,
                  status: 1,
                });
              })
            );
          }

         await PfiMaster.update({ status: 2, pfi_sent_date: uploadDate }, { // 1.2 means approved by PH and pending by BH
            where: { pfi_id }
        });
        res.status(200).json({ success: true, message: "PFI Signed Copy uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.PFISendByBH = async (req, res) => {
    try {
        let { pfi_id } = req.body
        const updatedpfiMasters = await PfiMaster.update({ status: 1 }, {
            where: { pfi_id }
        });
        res.status(200).json({ status: 'success', message: "Pfi Sent Sucessfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejectPfi = async (req, res) => {
    try {
        let { pfi_id, remarks } = req.body
        const updatedpfiMasters = await PfiMaster.update({ status: 3, approve_remarks: remarks }, {
            where: { pfi_id }
        });
        res.status(200).json({ status: 'success', data: updatedpfiMasters, message: "Pfi Approved Sucessfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retrieve a single PFI Master record by ID
exports.findOne = async (req, res) => {
    try {
        const pfiMaster = await PfiMaster.findByPk(req.params.id);
        if (pfiMaster) {
            res.status(200).json(pfiMaster);
        } else {
            res.status(404).json({ message: "PFI Master not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a PFI Master record by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await PfiMaster.update(req.body, {
            where: { pfi_id: req.params.id }
        });

        if (updated) {
            const updatedPfiMaster = await PfiMaster.findByPk(req.params.id);
            res.status(200).json(updatedPfiMaster);
        } else {
            res.status(404).json({ message: "PFI Master not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a PFI Master record by ID
exports.delete = async (req, res) => {
    try {
        const deleted = await PfiMaster.destroy({
            where: { pfi_id: req.params.id }
        });

        if (deleted) {
            res.status(204).json({ message: "PFI Master deleted" });
        } else {
            res.status(404).json({ message: "PFI Master not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
