const express = require("express");
const { createCompany, CompanyList, createBulkCompanies, CompanyView, updateCompany, DeleteCompany, NextCompanyNumber } = require("../controller/companyController");
const multer = require('multer');
const { protect } = require("../middleware/authMiddleware");
const CompanyModels = require("../models/CompanyModel");


const storage = multer.memoryStorage();  
const upload = multer({ storage });


const router = express.Router();

router.post('/create', createCompany);
router.get("/com/lits",CompanyList)
router.post('/upload-companies', upload.single('file'), createBulkCompanies);
router.post("/company/view",CompanyView)
router.put("/company/update",updateCompany)
router.post('/confirm-upload', async (req, res) => {
    try {
        const companiesToInsert = req.body;
        const lastCompany = await CompanyModels.findOne().sort({ company_no: -1 });
        let nextCompanyNo = lastCompany && lastCompany.company_no ? parseInt(lastCompany.company_no) + 1 : 1;
        const companiesWithCompanyNo = companiesToInsert.map(company => {
            company.company_no = (nextCompanyNo++).toString(); 
            return company;
        });
        const insertedCompanies = await CompanyModels.insertMany(companiesWithCompanyNo);
        res.status(201).json({
            message: `${insertedCompanies.length} Companies uploaded successfully`,
            data: insertedCompanies
        });
    } catch (error) {
        console.error('Error confirming upload:', error);
        res.status(500).json({
            message: 'Failed to save companies',
            error: error.message
        });
    }
});

router.delete("/company/delete",DeleteCompany)
router.get("/next-companyno",NextCompanyNumber)


module.exports=router
