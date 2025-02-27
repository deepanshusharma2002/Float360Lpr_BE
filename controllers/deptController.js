const { Department: DepartmentMaster, DeptDesigMapping, desigMaster } = require('../models');
const { Op } = require('sequelize'); // Import Op from Sequelize
// Create a new department
exports.createDepartment = async (req, res, next) => {
    try {
        const { dept_name, status } = req.body;
        const newDepartment = await DepartmentMaster.create({
            dept_name,
            status
        });
        res.status(201).json(newDepartment);
    } catch (err) {
        next(err)
    }
};


exports.getAllDepartments = async (req, res, next) => {
    const dept_id = req.query.dept_id;
    try {
        if (!dept_id) {
            const result = await DepartmentMaster.findAll({
                where: {
                    status: { [Op.ne]: 0 }
                },
                order: [['dept_id', 'DESC']]
            });
            res.status(200).json(result);
        } else {
            const result = await DepartmentMaster.findAll({
                where: {
                    dept_id: dept_id,
                    status: { [Op.ne]: 0 }
                },
                order: [['dept_id', 'DESC']]
            });
            res.status(200).json(result);
        }

    } catch (err) {
        next(err)
    }
};


exports.updateDepartmentById = async (req, res, next) => {
    const dept_id = req.query.dept_id;
    try {
        const {
            dept_name,
            status
        } = req.body;
        const result = await DepartmentMaster.update({
            dept_name,
            status
        }, {
            where: {
                dept_id: dept_id
            }
        });
        res.status(201).json({ message: "Updated Successfully" });
    } catch (err) {
        next(err)
    }
};

// Delete a department by ID
exports.deleteDepartmentById = async (req, res, next) => {
    const dept_id = req.query.dept_id;
    try {
        const result = await DepartmentMaster.update({ status: 0 }, {
            where: {
                dept_id: dept_id
            }
        });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err)
    }
};


// get designation by departmnets VIA mapped table
exports.getDesignation = async (req, res, next) => {
    try {
        const dept_id = req.query.dept_id;

        // design id list form dept and designation  mapping table
        const desig_id_list = await DeptDesigMapping.findAll({
            where: {
                dept_id: {
                    [Op.eq]: dept_id
                }
            },
            attributes: ['designation_id']
        })

        const desigIds = await desig_id_list.map(item => item.designation_id);

        // find designation as per ids
        const desiglist = await desigMaster.findAll({
            attributes: ['designation_id', 'designation_name'],
            where: {
                designation_id: {
                    [Op.in]: desigIds
                }
            }
        })


        res.status(200).json(desiglist);
    } catch (err) {
        next(err)
    }
}
