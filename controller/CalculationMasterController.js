const CalculationMaster = require('../models/CalculationMaster');

// GET all records
exports.getAllRecords = async (req, res) => {
    try {
        const records = await CalculationMaster.find();
        res.json({
            message: "Records retrieved successfully",
            data: records
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving records: " + err.message });
    }
};

// GET a specific record by ID
exports.getRecordById = async (req, res) => {
    try {
        const record = await CalculationMaster.findById(req.params.id);
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.json({
            message: "Record retrieved successfully",
            data: record
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving record: " + err.message });
    }
};

// POST a new record
exports.createRecord = async (req, res) => {
    const newRecord = new CalculationMaster(req.body);
    try {
        const savedRecord = await newRecord.save();
        res.status(201).json({
            message: "Record created successfully",
            data: savedRecord
        });
    } catch (err) {
        res.status(400).json({ message: "Error creating record: " + err.message });
    }
};

// PUT to update a record by ID
exports.updateRecord = async (req, res) => {
    try {
        const updatedRecord = await CalculationMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (err) {
        res.status(400).json({ message: "Error updating record: " + err.message });
    }
};

// DELETE a record by ID
exports.deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await CalculationMaster.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting record: " + err.message });
    }
};
