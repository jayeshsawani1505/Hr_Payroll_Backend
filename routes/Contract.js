const express = require('express');
const ContractorMaster = require('../models/ContractorModel');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const xlsx = require('xlsx');


router.post('/create', async (req, res) => {
    try {
        const newContractor = new ContractorMaster(req.body);
        await newContractor.save();
        res.status(201).json({ message: "Contractor created successfully", contractor: newContractor });
    } catch (error) {
        res.status(500).json({ message: "Error creating contractor", error });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const contractorId = req.params.id;
        const updatedContractor = await ContractorMaster.findByIdAndUpdate(contractorId, req.body, { new: true });
        if (!updatedContractor) {
            return res.status(404).json({ message: "Contractor not found" });
        }
        res.status(200).json({ message: "Contractor updated successfully", contractor: updatedContractor });
    } catch (error) {
        res.status(500).json({ message: "Error updating contractor", error });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const contractorId = req.params.id;
        const deletedContractor = await ContractorMaster.findByIdAndDelete(contractorId);
        if (!deletedContractor) {
            return res.status(404).json({ message: "Contractor not found" });
        }
        res.status(200).json({ message: "Contractor deleted successfully", contractor: deletedContractor });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contractor", error });
    }
});

router.get("/all", async (req, res) => {
    const { CompanyId } = req.query; // Extract CompanyId from query parameters
    try {
        const allContracts = await ContractorMaster.find({ CompanyId });
        if (!allContracts || allContracts.length === 0) {
            return res.status(404).json({ message: "No contracts found." });
        }
        return res.status(200).json(allContracts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching contracts." });
    }
});


router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;


        const fetchedData = await ContractorMaster.findById(id);


        if (!fetchedData) {
            return res.status(404).json({ message: "Contractor not found" });
        }

        return res.status(200).json(fetchedData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching contractor data", error: error.message });
    }
});







// Create a new contractor
router.post('/create', async (req, res) => {
    try {
        const newContractor = new ContractorMaster(req.body);
        await newContractor.save();
        res.status(201).json({ message: "Contractor created successfully", contractor: newContractor });
    } catch (error) {
        res.status(500).json({ message: "Error creating contractor", error });
    }
});

// Update a contractor
router.put('/update/:id', async (req, res) => {
    try {
        const contractorId = req.params.id;
        const updatedContractor = await ContractorMaster.findByIdAndUpdate(contractorId, req.body, { new: true });
        if (!updatedContractor) {
            return res.status(404).json({ message: "Contractor not found" });
        }
        res.status(200).json({ message: "Contractor updated successfully", contractor: updatedContractor });
    } catch (error) {
        res.status(500).json({ message: "Error updating contractor", error });
    }
});

// Delete a contractor
router.delete('/delete/:id', async (req, res) => {
    try {
        const contractorId = req.params.id;
        const deletedContractor = await ContractorMaster.findByIdAndDelete(contractorId);
        if (!deletedContractor) {
            return res.status(404).json({ message: "Contractor not found" });
        }
        res.status(200).json({ message: "Contractor deleted successfully", contractor: deletedContractor });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contractor", error });
    }
});

// Fetch all contractors
router.get("/all", async (req, res) => {
    try {
        const allContracts = await ContractorMaster.find();
        if (!allContracts || allContracts.length === 0) {
            return res.status(404).json({ message: "No contracts found." });
        }
        return res.status(200).json(allContracts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching contracts." });
    }
});

// View a single contractor
router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fetchedData = await ContractorMaster.findById(id);
        if (!fetchedData) {
            return res.status(404).json({ message: "Contractor not found" });
        }
        return res.status(200).json(fetchedData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching contractor data", error: error.message });
    }
});


router.post('/parse-excel', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const contractors = xlsx.utils.sheet_to_json(sheet);

        res.status(200).json({ success: true, data: contractors });
    } catch (error) {
        console.error("Error parsing Excel file:", error);
        res.status(500).json({ message: "Error parsing Excel file", error });
    }
});

router.post('/bulk-save/:companyId', async (req, res) => {
    try {
        const contractors = req.body;
        const { companyId } = req.params;

        if (!Array.isArray(contractors) || contractors.length === 0) {
            return res.status(400).json({ message: "No data to save" });
        }
        const contractorsWithCompanyId = contractors.map(contractor => ({
            ...contractor,
            CompanyId: companyId
        }));
        const savedContractors = await ContractorMaster.insertMany(contractorsWithCompanyId);

        res.status(201).json({ message: `${savedContractors.length} contractors have been saved successfully` });
    } catch (error) {
        console.error("Error saving contractors:", error);
        res.status(500).json({ message: "Error saving contractors", error });
    }
});



router.get('/next-contractor-no', async (req, res) => {
    try {
        const lastContractor = await ContractorMaster.findOne().sort({ createdAt: -1 }).select('Contractor_No');

        let nextContractorNo = "1";

        if (lastContractor) {
            nextContractorNo = (parseInt(lastContractor.Contractor_No) + 1).toString();
        }

        res.status(200).json({ nextContractorNo });
    } catch (error) {
        console.error('Error fetching next contractor number:', error);
        res.status(500).json({ message: 'Failed to fetch next contractor number', error: error.message });
    }
});





















module.exports = router;
