const express = require('express');
const { createLocation, updateLocation, deleteLocation, AllLocation, LocationView } = require('../controller/locationController');
const xlsx = require("xlsx")
const multer = require("multer");
const LocationMaster = require('../models/LocationSiteModel');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/create', createLocation);


router.put('/update/:id', updateLocation);


router.delete('/delete/:id', deleteLocation);

router.get("/all",AllLocation)

router.get("/view/:id",LocationView)



router.post('/parse-excel', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        const locations = xlsx.utils.sheet_to_json(sheet);

        res.status(200).json({ success: true, data: locations });
    } catch (error) {
        console.error("Error parsing Excel file:", error);
        res.status(500).json({ message: "Error parsing Excel file", error });
    }
});
router.post('/bulk-save/:companyId', async (req, res) => {
    try {
        const locations = req.body;
        const { companyId } = req.params;

        if (!Array.isArray(locations) || locations.length === 0) {
            return res.status(400).json({ message: "No data to save" });
        }
        const locationsWithCompanyId = locations.map(location => ({
            ...location,
            CompanyId: companyId
        }));
        const savedLocations = await LocationMaster.insertMany(locationsWithCompanyId);

        res.status(201).json({ message: `${savedLocations.length} locations have been saved successfully` });
    } catch (error) {
        console.error("Error saving locations:", error);
        res.status(500).json({ message: "Error saving locations", error });
    }
});





router.get('/next-location-no', async (req, res) => {
    try {

        const lastLocation = await LocationMaster.findOne().sort({ createdAt: -1 }).select('Location_No');

        let nextLocationNo = "1"; 

        if (lastLocation) {
            nextLocationNo = (parseInt(lastLocation.Location_No) + 1).toString();
        }

        res.status(200).json({ nextLocationNo });
    } catch (error) {
        console.error('Error fetching next location number:', error);
        res.status(500).json({ message: 'Failed to fetch next location number', error: error.message });
    }
});



module.exports = router;
