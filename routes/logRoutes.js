const express = require('express');
const Log = require('../models/log');
const router = express.Router();

// Create a new log entry
router.post('/', async (req, res) => {
    try {
        const newLog = new Log(req.body); // Accepts type instead of level
        await newLog.save();
        res.status(201).send(newLog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Retrieve all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).send(logs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Retrieve a specific log by ID
router.get('/:id', async (req, res) => {
    try {
        const log = await Log.findById(req.params.id);
        if (!log) {
            return res.status(404).send({ message: 'Log not found' });
        }
        res.status(200).send(log);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a log by ID
router.delete('/:id', async (req, res) => {
    try {
        const log = await Log.findByIdAndDelete(req.params.id);
        if (!log) {
            return res.status(404).send({ message: 'Log not found' });
        }
        res.status(200).send({ message: 'Log deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
