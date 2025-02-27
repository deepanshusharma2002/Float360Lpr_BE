const { ApprovalLog } = require("../../models"); // Adjust the path as needed
const GetTableNameByDocType = require("../../utilites/GetTableNameByDocType");
const db = require("../../models");
const { Op } = require("sequelize");

const ApprovalLogController = {
  // Create a new approval log
  async create(req, res) {
    let {
      doc_type,
      doc_id,
      doc_number,
      employee_id,
      action,
      comments,
      from_level,
    } = req.body;
    const approval_id = req.body.approval_id ? req.body.approval_id : "";
    console.log(req.body);
    try {
      const ApprovalPersonData = await db.ApprovalMatrix.findAll({
        where: {
          status: { [Op.ne]: 0 },
          module_name: doc_type,
        },
        order: [["approval_level", "ASC"]],
      });
      console.log("ApprovalPersonData.length", ApprovalPersonData.length);
      const LastLevel =
        ApprovalPersonData[ApprovalPersonData.length - 1].approval_level;
      if (from_level == 0 && ApprovalPersonData.length > 0) {
        console.log("A1");
        const approvalLog = await ApprovalLog.create({
          approval_matrix_id: ApprovalPersonData[0].approval_matrix_id, // Ensure you have the correct ID
          doc_type,
          doc_id,
          doc_num: doc_number,
          from_user_id: employee_id,
          from_user_level: 0,
          to_user_id: ApprovalPersonData[0].user_id,
          to_user_level: ApprovalPersonData[0].approval_level,
          action: "Request",
          comments,
          status: 1,
        });

        let table_name = GetTableNameByDocType(doc_type);
        console.log("db[table_name[0]]", db[table_name[0]]);
        const UpdateOPRStatus = await db[table_name[0]].update(
          {
            status: 16,
          },
          {
            where: {
              [table_name[1]]: doc_id,
            },
          }
        );

        console.log("Approval Log Created:", approvalLog);
        return res.status(201).json(approvalLog);
      } else if (
        from_level > 0 &&
        ApprovalPersonData.length > 0 &&
        action === "Reject"
      ) {
        console.log("B1");
        const ApprovalIndex = ApprovalPersonData.findIndex(
          (element) => element.approval_level == from_level
        );
        console.log("ApprovalIndex", ApprovalIndex);

        if (ApprovalIndex == 0 && action === "Reject") {
          console.log("B2");
          let table_name = GetTableNameByDocType(doc_type);
          const approvalLog = await db[table_name[0]].update(
            {
              status: 15,
            },
            {
              where: {
                [table_name[1]]: doc_id,
              },
            }
          );

          const UpdateStatusApproval = await ApprovalLog.update(
            {
              status: 3,
            },
            {
              where: {
                approval_id: approval_id,
              },
            }
          );

          console.log("Approval Log Created:", approvalLog);
          return res.status(201).json(approvalLog);
        } else if (ApprovalIndex > 0 && action === "Reject") {
          console.log("B3");

          const approvalLog = await ApprovalLog.create({
            approval_matrix_id:
              ApprovalPersonData[ApprovalIndex - 1].approval_matrix_id, // Ensure you have the correct ID
            doc_type,
            doc_id,
            doc_num: doc_number,
            from_user_id: ApprovalPersonData[ApprovalIndex].user_id,
            from_user_level: ApprovalPersonData[ApprovalIndex].approval_level,
            to_user_id: ApprovalPersonData[ApprovalIndex - 1].user_id,
            to_user_level: ApprovalPersonData[ApprovalIndex - 1].approval_level,
            action: "Reject",
            comments,
            status: 1,
          });

          const UpdateStatusApproval = await ApprovalLog.update(
            {
              status: 3,
            },
            {
              where: {
                approval_id: approval_id,
              },
            }
          );

          console.log("Approval Log Created:", approvalLog);
          return res.status(201).json(approvalLog);
        }
      } else if (
        from_level > 0 &&
        ApprovalPersonData.length > 0 &&
        action == "Accept"
      ) {
        console.log("B4");

        console.log("B1");
        const ApprovalIndex = ApprovalPersonData.findIndex(
          (element) => element.approval_level == from_level
        );
        console.log("ApprovalIndex", LastLevel, from_level);

        if (LastLevel == from_level) {
          console.log("B10");
          let table_name = GetTableNameByDocType(doc_type);
          const approvalLog = await db[table_name[0]].update(
            {
              status: 1,
            },
            {
              where: {
                [table_name[1]]: doc_id,
              },
            }
          );

          const UpdateStatusApproval = await ApprovalLog.update(
            {
              status: 2,
            },
            {
              where: {
                approval_id: approval_id,
              },
            }
          );

          console.log("Approval Log Created:", approvalLog);
          return res.status(201).json(approvalLog);
        } else {
          console.log("B11");

          const approvalLog = await ApprovalLog.create({
            approval_matrix_id:
              ApprovalPersonData[ApprovalIndex + 1].approval_matrix_id, // Ensure you have the correct ID
            doc_type,
            doc_id,
            doc_num: doc_number,
            from_user_id: ApprovalPersonData[ApprovalIndex].user_id,
            from_user_level: ApprovalPersonData[ApprovalIndex].approval_level,
            to_user_id: ApprovalPersonData[ApprovalIndex + 1].user_id,
            to_user_level: ApprovalPersonData[ApprovalIndex + 1].approval_level,
            action: "Accept",
            comments,
            status: 1,
          });

          const UpdateStatusApproval = await ApprovalLog.update(
            {
              status: 2,
            },
            {
              where: {
                approval_id: approval_id,
              },
            }
          );

          console.log(
            "Approval Log Created:",
            ApprovalPersonData[ApprovalIndex]
          );
          return res.status(201).json(approvalLog);
        }
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Get all approval logs
  async findAll(req, res) {
    const approval_id = req.query.approval_id;
    const doc_id = req.query.doc_id;
    const doc_type = req.query.doc_type;
    console.log("data", req.query);

    try {
      if (approval_id) {
        const result = await ApprovalLog.findAll({
          where: {
            approval_id: approval_id,
            status: { [Op.ne]: 0 },
          },
        });
        res.status(200).json(result);
      } else if (doc_id && doc_type) {
        console.log("Sahrma");
        const result = await ApprovalLog.findAll({
          attributes: [
            "approval_id"
            , "approval_matrix_id"
            , "doc_type"
            , "doc_id"
            , "doc_num"
            , "from_user_id"
            , "from_user_level"
            , "to_user_id"
            , "to_user_level"
            , "action"
            , "comments"
            , "createdAt"
            , "updatedAt"
            , "status",
            [
              db.sequelize.literal("dbo.fn_GetUserName(ApprovalLog.from_user_id)"),
              "from_user_name",
            ],],
          include: [
            {
              model: db.ApprovalMatrix,
              include: [
                {
                  model: db.user,
                  attributes: [
                    "username",
                    "usermob",
                    "first_name",
                    "last_name",
                    "email",
                    "phone_number",
                  ],
                },
              ],
            },
          ],
          where: {
            doc_id, // Filters by document ID
            doc_type, // Filters by document type
            status: { [Op.ne]: 0 }, // Filters by status not equal to 0
          },
        });

        res.status(200).json(result);
      } else {
        const result = await ApprovalLog.findAll({
          where: {
            // status: { [Op.ne]: 0 },
          },
        });
        res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get an approval log by ID
  async findById(req, res) {
    const approval_id = req.query.approval_id;
    try {
      if (approval_id) {
        const result = await ApprovalLog.findAll({
          where: {
            payment_term_container_master_id: payment_term_container_master_id,
            status: { [Op.ne]: 0 },
          },
        });
        res.status(200).json(result);
      }
      return res.status(200).json(approvalLog);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update an approval log by ID
  async update(req, res) {
    try {
      const [updated] = await ApprovalLog.update(req.body, {
        where: { approval_id: req.params.id },
      });
      if (!updated) {
        return res.status(404).json({ error: "Approval log not found" });
      }
      const updatedApprovalLog = await ApprovalLog.findByPk(req.params.id);
      return res.status(200).json(updatedApprovalLog);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Delete an approval log by ID
  async delete(req, res) {
    try {
      const deleted = await ApprovalLog.destroy({
        where: { approval_id: req.params.id },
      });
      if (!deleted) {
        return res.status(404).json({ error: "Approval log not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ApprovalLogController;
