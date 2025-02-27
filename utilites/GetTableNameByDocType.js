const GetTableNameByDocType = (doc_type) => {
    switch (doc_type) {
        case "OPR":
            return ["OprMaster", "opr_id"];
        case "QUO":
            return ["quotation_master", "quo_id"];
        case "RFQ":
            return ["rfq", "rfq_id"];
        case "OPO":
            return ["opo_master", "opo_master_id"];
        case "CI":
            return ["commercial_invoice", "commercial_invoice_id"];
            case "PO":
            return ["po_master", "po_id"];
        default:
            return "Not Defined"; 
    }
};
module.exports = GetTableNameByDocType;