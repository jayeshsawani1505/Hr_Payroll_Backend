const EmployeeModel = require("../models/EmployeeModel");

exports.createEmployee = async (req, res) => {
    try {
        const Employee = new EmployeeModel(req.body);
        await Employee.save();
        res.status(201).json({ message: "Employee created successfully", data: Employee });
    } catch (error) {
        res.status(400).json({ message: "Error creating location", error: error.message });
    }
};

// Get employees by CompanyId
exports.getEmployeesByCompanyId = async (req, res) => {
    const { companyId } = req.params; // Extracting companyId from request parameters

    try {
        const employees = await EmployeeModel.find({ companyId }); // Query the Employee model
        if (employees.length === 0) {
            return res.status(404).json({ message: "No employees found for this company." });
        }
        res.status(200).json({ message: "Employees retrieved successfully", data: employees });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving employees", error: error.message });
    }
};
