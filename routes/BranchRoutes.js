const express = require('express');
const { createBranch, updateBranch, deleteBranch, FetchAllBranch, ViewBranch, ParseExcel, BulkSave, NextbranchNumber } = require('../controller/branchController');
const multer = require('multer');
const router = express.Router();


const storage = multer.memoryStorage();  
const upload = multer({ storage });


router.post('/branch', createBranch);

router.get("/all",FetchAllBranch)

router.get("/view/branch/:id",ViewBranch)


router.put('/branch/:id', updateBranch);


router.delete('/branch/:id', deleteBranch);

router.post("/excel/branch",upload.single('file'),ParseExcel)

router.post("/excel/upload/:companyId",BulkSave)
router.get('/next-branch-no', NextbranchNumber);

module.exports = router;
