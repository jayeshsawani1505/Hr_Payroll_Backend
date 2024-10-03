const BranchModel = require("../models/BranchModel");
const xlsx = require('xlsx');



const createBranch = async (req, res) => {
    try {
        const branch = new BranchModel(req.body);
        await branch.save();
        res.status(201).json({ message: 'Branch created successfully', branch });
    } catch (error) {
        res.status(400).json({ message: 'Error creating branch', error });
    }
};



const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBranch = await BranchModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBranch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({ message: 'Branch updated successfully', updatedBranch });
    } catch (error) {
        res.status(400).json({ message: 'Error updating branch', error });
    }
};


// DELETE /api/branch/:id
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBranch = await BranchModel.findByIdAndDelete(id);
        if (!deletedBranch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting branch', error });
    }
};


const FetchAllBranch = async (req, res) => {
    try {
        const branches = await BranchModel.find();
        return res.status(200).json(branches); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while fetching branches." }); 
    }
};


const ViewBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branchDetail = await BranchModel.findById(id);
        if (!branchDetail) {
            return res.status(404).json({ message: "Branch not found" });
        }
        return res.status(200).json(branchDetail);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching branch details", error: error.message });
    }
};


const ParseExcel = async (req, res) => {
    try {
      // Check if the file exists
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
  
      // Parse the file from memory buffer
      const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];
  
      // Convert the sheet data into JSON format
      const branchData = xlsx.utils.sheet_to_json(sheet);
  
      // Return the parsed data
      res.json({
        success: true,
        data: branchData,
      });
    } catch (err) {
      console.error('Error parsing Excel file:', err);
      res.status(500).json({ success: false, message: 'Error parsing Excel file' });
    }
  };

  const BulkSave = async (req, res) => {
    try {
      const branches = req.body; 
      const { companyId } = req.params; 
      const branchesWithCompanyId = branches.map(branch => ({
        ...branch,
        CompanyId: companyId
      }));
      await BranchModel.insertMany(branchesWithCompanyId);
  
      res.json({ success: true, message: 'Branches saved successfully' });
    } catch (err) {
      console.error('Error saving branches:', err);
      res.status(500).json({ success: false, message: 'Error saving branches' });
    }
  };

  const NextbranchNumber = async(req,res)=>{
    try {
        const lastBranch = await BranchModel.findOne().sort({ createdAt: -1 }).select('Branch_No');
        let nextBranchNo = "1"; 
        if (lastBranch) {
            nextBranchNo = (parseInt(lastBranch.Branch_No) + 1).toString();
        }
        res.status(200).json({ nextBranchNo });
    } catch (error) {
        console.error('Error fetching next branch number:', error);
        res.status(500).json({ message: 'Failed to fetch next branch number', error: error.message });
    }
  }

module.exports={
    createBranch,
    updateBranch,
    deleteBranch,
    FetchAllBranch,
    ViewBranch,
    ParseExcel,
    BulkSave,
    NextbranchNumber

}