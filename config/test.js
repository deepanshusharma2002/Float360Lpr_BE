// const express = require('express');
// const userController = require('../controllers/userController'); // Adjust the path to your controllers

// const router = express.Router();

// router.post('/users', userController.createUser);
// router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);
// router.put('/users/:id', userController.updateUserById);
// router.delete('/users/:id', userController.deleteUserById);

// module.exports = router;

const express = require("express");
const { createUser, getAllUsers } = require("../controllers/userController"); // Adjust the path to your controllers

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);

module.exports = router;
