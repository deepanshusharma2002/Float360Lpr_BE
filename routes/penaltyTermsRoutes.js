/**
* Description: penalty terms show in rfq
* Developer: Rakesh
* Created Date: 17-07-2024
* Updated By:
* Last Updated:17-07-2024
*/



const express = require('express');
const router = express.Router();
const {
    createPenaltyTerm,
    getAllPenaltyTerms,
    getPenaltyTermById,
    updatePenaltyTerm,
    deletePenaltyTerm
} = require('../controllers/penaltyTermsController');




// Route to create a new penalty term
router.post('/', createPenaltyTerm);

// Route to get all penalty terms
router.get('/', getAllPenaltyTerms);

// Route to get a penalty term by ID
router.get('/get', getPenaltyTermById);

// Route to update a penalty term by ID
router.put('/', updatePenaltyTerm);

// Route to delete a penalty term by ID
router.delete('/', deletePenaltyTerm);




module.exports = router;
