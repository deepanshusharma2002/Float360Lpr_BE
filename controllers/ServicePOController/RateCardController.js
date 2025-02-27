const {
  fcl_spo_rate_card_container,
  fcl_spo_rate_card_master,
} = require("../../models");
const sq = require("sequelize");

//  Party Information controller Post Api
const createRateCardMaster = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const {
      rateCardId,
      vendor_id,
      quotationRefNo,
      quoteDate,
      rateValidFrom,
      rateValidTill,
      pol,
      pod,
      containerDetails,
    } = req.body;

    console.log(req.body, { depth: null });

   if(rateCardId){
    const newratecard = await fcl_spo_rate_card_master.update({
      quote_ref_no: quotationRefNo,
      quote_date: quoteDate,
      rate_valid_from: rateValidFrom,
      rate_valid_till: rateValidTill,
      port_of_loading: pol,
      port_of_discharge: pod,
      status: 1,
      created_by: "Admin",
      updated_by: "Admin",
    }, {where: {fcl_spo_rate_card_master_id: rateCardId}});

    if (containerDetails && containerDetails.length > 0) {
      await Promise.all(
        containerDetails.map(async (item) => {
          if(item?.fcl_spo_rate_card_container_id){
            await fcl_spo_rate_card_container.update({
              container_type: item.container_type,
              currency: item.currency,
              eta: item.eta,
              ets: item.ets,
              free_days_at_port_of_discharge: item.free_days_at_pod,
              free_days_at_port_of_loading: item.free_days_at_pol,
              rate: item.rate,
              sailing_days:item.sailing_days,
              remarks: item.remarks,
              shipping_line: item.shipping_line,
            }, {where: {fcl_spo_rate_card_container_id: item?.fcl_spo_rate_card_container_id}});
          }else{
            await fcl_spo_rate_card_container.create({
              fcl_spo_rate_card_master_id: rateCardId,
              container_type: item.container_type,
              currency: item.currency,
              eta: item.eta,
              ets: item.ets,
              free_days_at_port_of_discharge: item.free_days_at_pod,
              free_days_at_port_of_loading: item.free_days_at_pol,
              rate: item.rate,
              sailing_days:item.sailing_days,
              remarks: item.remarks,
              shipping_line: item.shipping_line,
              status: 1,
            });
          }
        })
      );
    }
    res.status(200).json({ message: "Rate Card Master created successfully" });
   }else{
    const newratecard = await fcl_spo_rate_card_master.create({
      vendor_id,
      quote_ref_no: quotationRefNo,
      quote_date: quoteDate,
      rate_valid_from: rateValidFrom,
      rate_valid_till: rateValidTill,
      port_of_loading: pol,
      port_of_discharge: pod,
      status: 1,
      created_by: "Admin",
      updated_by: "Admin",
    });
    const lasteInsdertedId = newratecard.fcl_spo_rate_card_master_id;

    if (containerDetails && containerDetails.length > 0) {
      await Promise.all(
        containerDetails.map(async (item) => {
          await fcl_spo_rate_card_container.create({
            fcl_spo_rate_card_master_id: lasteInsdertedId,
            container_type: item.container_type,
            currency: item.currency,
            eta: item.eta,
            ets: item.ets,
            free_days_at_port_of_discharge: item.free_days_at_pod,
            free_days_at_port_of_loading: item.free_days_at_pol,
            rate: item.rate,
            sailing_days:item.sailing_days,
            remarks: item.remarks,
            shipping_line: item.shipping_line,
            status: 1,
          });
        })
      );
    }
    res.status(200).json({ message: "Rate Card Master created successfully" });
   }

  } catch (err) {
    console.log("Error in RateCard:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get API
const getRateCardMaster = async (req, res) => {
  try {
    const { id } = req.query;

    let whereClause = {};
    if (id) {
      whereClause.fcl_spo_rate_card_master_id = id;
    }

    const rateCards = await fcl_spo_rate_card_master.findAll({
      where: whereClause,
      include: [
        {
          model: fcl_spo_rate_card_container,
          as: "fcl_spo_rate_card_containers",
          attributes: [
            "fcl_spo_rate_card_container_id",
            "container_type",
            "shipping_line",
            "currency",
            "rate",
            "ets",
            "eta",
            "sailing_days",
            "free_days_at_port_of_loading",
            "free_days_at_port_of_discharge",
            "remarks",
            "status",
          ],
        },
      ],
      attributes: [
        "fcl_spo_rate_card_master_id",
        "vendor_id",
        "quote_ref_no",
        "quote_date",
        "rate_valid_from",
        "rate_valid_till",
        "port_of_loading",
        "port_of_discharge",
        "created_by",
        "updated_by",
        "status",
      ],
    });

    if (!rateCards || rateCards.length === 0) {
      return res.status(404).json({ message: "Rate Card not found" });
    }

    res.status(200).json(rateCards);
  } catch (err) {
    console.error("Error fetching Rate Card:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createRateCardMaster, getRateCardMaster };
