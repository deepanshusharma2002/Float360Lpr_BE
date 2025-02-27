const db = require("../../models");
const { Op } = require("sequelize");

const GetContainerAllocationByCiId = async (req, res, next) => {
  let ci_id = req.query.ci_id;
  try {
    let result = await db.container_allocation.findAll({
      where: { ci_id: ci_id, status: 1 },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const GetContainerItemsByCiId = async (req, res, next) => {
  let {ci_id} = req.query;
  try {
    let result = await db.shipment_advise_items.findAll({
      attributes: {exclude: ["item_type", "item_specification", "item_description", "opo_qty", "rate", "currency", "remarks"]},
      where: { ci_id: ci_id, status: 1 },
      include: [
        { model: db.ItemsMaster, attributes: {exclude: ["item_img", "item_img_name"]} },
        { model: db.container_type_master, attributes: ["container_type_name"]} ,
        // { model: db.po_items},
      ],
    });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const GetContainerByBL = async (req, res, next) => {
  let { shippment_advise_id, type } = req.query;
  console.log('type', type);
  try {
    if (type?.toUpperCase() === 'FCL') {
      let result = await db.add_shippment_container.findAll({
        attributes: [
          "add_shippment_container_id",
          "po_id",
          "po_num",
          "container_no",
          "container_type",
          "net_weight",
          "total_gross_weight",
          "package_detail",
          "created_on",
          "created_by",
          "updated_on",
          "updated_by",
          "status",
          "soncap_amount",
          "bl_num",
          "do_validity_dt",
          "total_quantity",
          "total_packages",
          [
            db.sequelize.literal("dbo.fn_containerType(container_type)"),
            "container_size_name",
          ],
        ],
        include: [
          {
            model: db.shippment_container_detail,
            include: [
              {
                model: db.UomMaster,
                attributes: ["uom_name"],
              },
              {
                model: db.PackageTypeMaster,
                attributes: ["package_type"],
              },
            ],
          },
        ],
        where: { shippment_advise_id: shippment_advise_id, status: 1 },
    });
    return res.status(201).json(result);
  }else {
    let result = await db.pack_info.findAll({
      where: { shippment_advise_id: shippment_advise_id, status: 1 },
    });
    return res.status(201).json(result);
  }

} catch (err) {
  next(err);
}
};

const GetNafdacExpenseOerations = async (req, res, next) => {
  let { ci_id } = req.query;
  try {
    let result = await db.nafdac_clearance.findAll({
      include: [
        { model: db.nafdac_inspection_expense },
        { model: db.nafdac_penalty },
        { model: db.nafdac_penalty_item },
      ],
      where: { ci_id: ci_id, status: { [Op.ne]: 0 } },
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const GetLapse = async (req, res, next) => {
  const { ci_id, doc_type } = req.query;
  try {
    if (ci_id && doc_type) {
      let result = await db.ci_lapse_master.findAll({
        where: { ci_id, doc_type },
      });
      return res.status(201).json(result);
    } else if (ci_id) {
      let result = await db.ci_lapse_master.findAll({
        where: { ci_id },
      });
      return res.status(201).json(result);
    } else {
      let result = await db.ci_lapse_master.findAll();
      return res.status(201).json(result);
    }
  } catch (err) {
    next(err);
  }
};

CommercialInvoiceControllerGet = {
  GetContainerByBL,
  GetContainerAllocationByCiId,
  GetContainerItemsByCiId,
  GetLapse,
  GetNafdacExpenseOerations,
};

module.exports = CommercialInvoiceControllerGet;
