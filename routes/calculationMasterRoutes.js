const express = require('express');
const router = express.Router();
const CalculationMasterController = require('../controller/CalculationMasterController');

// Route to get all records
router.get('/get', CalculationMasterController.getAllRecords);

// Route to get a specific record by ID
router.get('/:id', CalculationMasterController.getRecordById);

// Route to create a new record
router.post('/', CalculationMasterController.createRecord);

// Route to update a record by ID
router.put('/:id', CalculationMasterController.updateRecord);

// Route to delete a record by ID
router.delete('/:id', CalculationMasterController.deleteRecord);

module.exports = router;