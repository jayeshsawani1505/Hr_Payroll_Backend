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