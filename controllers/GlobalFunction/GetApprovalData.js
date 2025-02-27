const db = require("../../models");
const { ApprovalLog } = db;

const getApprovalData = async (doc_type, doc_id, doc_num) => {
    try {
      if (doc_id || doc_num) {
        const condition = {
          doc_type,
        };
  
        // Set the appropriate key based on which variable is provided
        if (doc_id) {
          condition.doc_id = doc_id;
        } else if (doc_num) {
          condition.doc_num = doc_num;
        }
  
        const result = await ApprovalLog.findAll({
          where: condition,
        });
        return result;
      }
    } catch (err) {
      return err;
    }
  };
  

module.exports = getApprovalData;
