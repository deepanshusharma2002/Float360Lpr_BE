const { ApprovalMatrix, ApprovalLog } = require('../models'); // Adjust the path

const approvalRequestMiddleware = async (req, res, next) => {
    const { action, comments, doc_type, doc_id, doc_num, user_id, user_level } = req.body;
    console.log("************")
    console.log(req.body);
    let approval_log = {
        doc_type,
        doc_id,
        action,
        comments,
        doc_num,
        from_user_id: user_id,//sender who send for approval
        from_user_level: user_level || 'Processor'//sender who send fro approval
    }

    // first find user form approval matrix for validator user
    const validModules = ['OPR', 'QUO', 'RFQ', 'OPO', 'CI'];
    if (!validModules.includes(doc_type)) {
        logger.error(`Invalid module type: ${doc_type}`);
        return res.status(400).json({ error: 'Invalid module type' });
    }

    try {
        // Check if the record exists
        const approvalMatrix = await ApprovalMatrix.findOne({
            where: {
                module_name: doc_type,
                approval_level: user_level == 'Processor' ? 'Level 1' : user_level
            }
        });
        console.log("********approval matrix ************")
        console.log(approvalMatrix)


        if (!approvalMatrix) {
            logger.error(`Approval matrix not found for ID: ${id}`);
            return res.status(404).json({ error: 'Invalid Request' });
        } else {
            approval_log.to_user_id = approvalMatrix.dataValues.user_id;
            approval_log.to_user_level = 1 || approvalMatrix.dataValues.approval_level;
            approval_log.approval_matrix_id = approvalMatrix.dataValues.approval_matrix_id;
            let approvalLogEntry = await ApprovalLog.create(approval_log);
            next();
            // res.status(200).json({ msg: "Approval request sent sucessfully", data: approvalLogEntry })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};





module.exports = approvalRequestMiddleware; 