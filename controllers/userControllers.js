const { Op } = require('sequelize');
const db = require('../models')
const pwd = require('../utilites/passwordHashing')
const jwt = require('jsonwebtoken');
const { user: User } = db
const jwtSecretKey = process.env.JWT_SECRET;






//Get all users
// const getAllUser = async (req, res, next) => {
//     try {
//         const items = await User.findAll({
//             attributes: ['user_id', 'first_name', 'last_name', 'registration_date', 'role', 'email', 'phone_number', 'date_of_birth', 'address1_line1', 'address1_line2', 'city1', 'state1', 'country1', 'postal_code1', 'address2_line1', 'address2_line2', 'city2', 'state2', 'country2', 'postal_code2']
//         });

//         res.status(200).json(items);
//     } catch (err) {
//         next(err);
//     }
// };


const getAllUser = async (req, res, next) => {
    const { user_id } = req.query;
    try {
        if (user_id) {
            const items = await User.findOne({
                include: [
                    { model: db.role, attributes: ["role_name"] },
                    { model: db.desigMaster, attributes: ["designation_name"] },
                    { model: db.Department, attributes: ["dept_name"] }
                ],
                where: {
                    user_id,
                    status: { [Op.ne]: 0 }
                }
            });
            const user = await User.findByPk(user_id, {
                include: [
                    { model: db.role, attributes: ["role_name"] },
                    { model: db.desigMaster, attributes: ["designation_name"] },
                    { model: db.Department, attributes: ["dept_name"] }
                ]
            });
            res.status(200).json(user);
        } else {
            const user = await User.findAll({
                include: [
                    { model: db.role, attributes: ["role_name"] },
                    { model: db.desigMaster, attributes: ["designation_name"] },
                    { model: db.Department, attributes: ["dept_name"] }
                ],
                where: {
                    status: { [Op.ne]: 0 }
                }
            });
            res.status(200).json(user);
        }
    } catch (err) {
        next(err);
    }
};



// Controller method to delte item by id
const createUser = async (req, res, next) => {
    try {
        const {
            userId,
            first_name,
            last_name,
            email, username,
            phone_number,
            password,
            address1_line1,
            address1_line2,
            city1,
            state1,
            country1,
            postal_code1,
            address2_line1,
            address2_line2,
            city2,
            state2,
            country2,
            postal_code2,
            dept_id,
            design_id,
            role,
            is_active,
            date_of_birth,
            registration_date
        } = req.body;
        console.log("req", req.body);

        if (userId) {
            const newItem = await User.update({
                first_name, last_name, email, username, phone_number, password_hash: password, address1_line1,
                address1_line2,
                city1,
                state1,
                country1,
                postal_code1,
                address2_line1,
                address2_line2,
                city2,
                state2,
                country2,
                postal_code2,
                dept_id,
                design_id,
                role,
                is_active,
                date_of_birth,
                registration_date,
                status: Number(is_active)
            }, { where: { user_id: userId } });

            res.status(201).json(newItem);
        } else {
            const newItem = await User.create({
                first_name, last_name, email, username, phone_number, password_hash: password, address1_line1,
                address1_line2,
                city1,
                state1,
                country1,
                postal_code1,
                address2_line1,
                address2_line2,
                city2,
                state2,
                country2,
                postal_code2,
                dept_id,
                design_id,
                role,
                is_active,
                date_of_birth,
                registration_date,
                status: Number(is_active)
            });

            res.status(201).json(newItem);
        }



    } catch (err) {
        // console.error('Error creating item:', err);s
        // res.status(500).json({ error: 'Error creating item' });
        next(err);
    }
};

// Verifying a user's password
const loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ where: { email }, attributes: ['first_name', 'email', 'role','role_name', 'password_hash'] });
        if (user) {

            const isValid = await pwd.verifyPassword(password, user.dataValues.password_hash);

            if (isValid) {
                let { first_name, email, role,role_name } = user;
                //token genration
                const jwtToken = jwt.sign({ first_name, email, role,role_name }, jwtSecretKey);
                res.status(200).json({ first_name, email, role,role_name, servicetoken: jwtToken });
            } else {
                res.status(401).json({ msg: 'Invalid password' });
            }
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error('Error login User:', error);
        next(error);
    }
};


module.exports = {
    getAllUser,
    // getUserById,
    createUser,
    loginUser,
    // deleteUserById,
    // getUserByToken,
};