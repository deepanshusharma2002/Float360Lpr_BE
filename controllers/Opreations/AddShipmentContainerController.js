const db = require("../../models");
const { add_shippment_container, document, shippment_container_detail } = db;
const { Op } = require("sequelize");

// Create a new add_shippment_container
const createAddContainer = async (req, res, next) => {
  console.log(req.body);
  try {
    const { po_id, po_num, ci_id,  cpackageDetail } = req.body;
    console.log(req.body.cpackageDetail[0].packing_info[0]);
    console.log(req.body);

    // Step 1: Create containers
    const containerPromises = cpackageDetail.map(async (container) => {
      const createdContainer = await add_shippment_container.create({
        container_no: container.container_no,
        container_type: container.container_type,
        container_size: container.container_size,
        packet_uom: container.p_uom,
        gross_weight: container.total_gross_wt,
        net_weight: container.total_net_wt,
        po_id: po_id,
        ci_id: ci_id,
        po_num: po_num,
        status: 1, 
      });
      console.log(createdContainer.add_shippment_container_id);
      const lastInsertedId = createdContainer.add_shippment_container_id;

      // Create details for each container
      const detailPromises = container.packing_info.map(async (detail) => {
        await shippment_container_detail.create({
          add_shippment_container_id: lastInsertedId,
          packet_qty: detail.p_qty,
          no_package: detail.no_package,
          packet_weight: detail.p_net_wt,
          status: 1, 
        });
      });
      await Promise.all(detailPromises);
    });

    // Wait for all containers and their details to be created
    await Promise.all(containerPromises);

    await db.po_master.update({
      status: 11
  },
      {
          where: { po_id }
      }
  )

    // Respond once everything is done
    res
      .status(200)
      .json({ message: "Containers and details added successfully" });
  } catch (err) {
    next(err);
  }
};

// Get Commercial Invoice
const getAddContainer = async (req, res, next) => {
  const shippment_container_detail_id = req.query.shippment_container_detail_id;
  try {
    if (!shippment_container_detail_id) {
      const result = await add_shippment_container.findAll({
        attributes: {
          include: [[ db.sequelize.literal("dbo.fn_UomName(packet_uom)"), "uom" ],
          [ db.sequelize.literal("dbo.fn_containerType(container_size)"), "containerSize" ],
          [ db.sequelize.literal("dbo.fn_GetShippingContainerType(container_type)"), "containerType" ]]
        },
        where: {
          status: { [Op.ne]: 0 },
        },
        include: [{ model: shippment_container_detail }],
        // raw: true,
      });
      return res.status(200).json(result);
    } else {
      const result = await add_shippment_container.findByPk(
        shippment_container_detail_id,
        {
          where: {
            status: { [Op.ne]: 0 },
          },
          include: [{ model: shippment_container_detail }],
        }
      );
      return res.status(200).json(result);
    }
  } catch (err) { 
    next(err);
  }
};

// Update a penalty term by ID
const updateAddContainer = async (req, res, next) => {
  console.log("body: ", req.body);
  console.log("file: ", req.files);

  try {
    const {
      shippment_container_detail_id,
      tdo_handover_date,
      transporter,
      eir_received_date,
    } = req.body;

    const AddContainer = await add_shippment_container.findByPk(
      shippment_container_detail_id
    );

    if (!AddContainer) {
      return res
        .status(404)
        .json({ message: "Container Allocation not found" });
    }

    if (req.files && req.files.length > 0) {
      const DocumentAddContainer = await add_shippment_container.findAll({
        where: {
          table_name: "add_shippment_container",
          linked_id: shippment_container_detail_id,
        },
      });

      if (!DocumentAddContainer) {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await document.create({
              linked_id: shippment_container_detail_id,
              table_name: "add_shippment_container",
              type: "SHIPMENT CONTAINER ADD ",
              doc_name: `${file.fieldname}-${file.originalname}`,
              doc_base64: base64,
              title: "EIR File Document in Container Allocation",
              status: 1,
            });
          })
        );
      } else {
        await Promise.all(
          req.files.map(async (file) => {
            const base64 = file.buffer.toString("base64");
            await DocumentAddContainer.update({
              doc_name: `${file.fieldname}-${file.originalname}`,
              doc_base64: base64,
              status: 1,
            });
          })
        );
      }
    }

    if (tdo_handover_date) {
      await AddContainer.update({ tdo_given_date: tdo_handover_date });
    }
    if (eir_received_date) {
      await AddContainer.update({ eir_received_date });
    }
    if (transporter) {
      await AddContainer.update({ transporter });
    }

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a penalty term by ID
const deleteAddContainer = async (req, res, next) => {
  const shippment_container_detail_id = req.query.shippment_container_detail_id;
  const array = shippment_container_detail_id
    .split(",")
    .map((item) => Number(item.trim()));
  console.log(array);
  try {
    const result = await add_shippment_container.update(
      { status: 0 },
      {
        where: {
          shippment_container_detail_id: array,
        },
      }
    );
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

AddContainerController = {
  createAddContainer,
  getAddContainer,
  updateAddContainer,
  deleteAddContainer,
};

module.exports = AddContainerController;
