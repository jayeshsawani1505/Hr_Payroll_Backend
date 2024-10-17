const express = require('express');
const { createEmployee } = require('../controller/EmployeeController');
const multer = require('multer');
const path = require('path');
const EmployeeModel = require('../models/EmployeeModel');
const fs = require('fs');
const XLSX = require("xlsx")

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/create-employee', upload.fields([
    { name: 'Employee_Image', maxCount: 1 },
    { name: 'Employee_Sign_Image', maxCount: 1 }
]), async (req, res) => {
    try {
        const { body, files } = req;


        const profileImagePath = files.Employee_Image ? files.Employee_Image[0].filename : null;
        const signImagePath = files.Employee_Sign_Image ? files.Employee_Sign_Image[0].filename : null;


        const employeeFamilyDetails = body.Employee_Family_Detail ? JSON.parse(body.Employee_Family_Detail) : {};
        const employeeSalary = body.Employee_Salary ? JSON.parse(body.Employee_Salary) : {};

        const newEmployee = new EmployeeModel({
            ...body,
            Employee_Image: profileImagePath,
            Employee_Sign_Image: signImagePath,
            Employee_Family_Detail: employeeFamilyDetails,
            Employee_Salary: employeeSalary
        });


        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully!', employee: newEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create employee', error: error.message });
    }
});

router.get('/employees/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;
        const employees = await EmployeeModel.find({ CompanyId: companyId });

        if (!employees.length) {
            return res.status(404).json({ message: 'No employees found for this company.' });
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve employees', error });
    }
});


router.get('/next-sr-emp', async (req, res) => {
    try {
        const employeeCount = await EmployeeModel.countDocuments();
        const nextSrEmp = employeeCount + 1;
        res.status(200).json({ nextSr_emp: nextSrEmp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get the next serial number', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeModel.findById(id).populate('CompanyId');

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch employee details', error });
    }
});


router.put('/:id', upload.fields([
    { name: 'Employee_Image', maxCount: 1 },
    { name: 'Employee_Sign_Image', maxCount: 1 }
]), async (req, res) => {
    try {
        const { id } = req.params;
        const { body, files } = req;



        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }


        if (files.Employee_Image) {
            employee.Employee_Image = files.Employee_Image[0].filename;
        }
        if (files.Employee_Sign_Image) {
            employee.Employee_Sign_Image = files.Employee_Sign_Image[0].filename;
        }


        const employeeFamilyDetails = body.Employee_Family_Detail ? JSON.parse(body.Employee_Family_Detail) : {};
        const employeeSalary = body.Employee_Salary ? JSON.parse(body.Employee_Salary) : {};


        Object.assign(employee, body, {
            Employee_Family_Detail: employeeFamilyDetails,
            Employee_Salary: employeeSalary,
        });


        await employee.save();
        res.status(200).json({ message: 'Employee updated successfully!', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update employee details', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete employee', error });
    }
});

router.post('/upload-excel', upload.single('file'), (req, res) => {
    try {
        const filePath = req.file.path;


        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);


        fs.unlinkSync(filePath);

        res.status(200).json({
            status: 'success',
            data: worksheet
        });
    } catch (error) {
        console.error('Error processing Excel file:', error);


        res.status(500).json({
            status: 'error',
            message: 'Failed to process Excel file',
            error: error.message
        });
    }
});

router.post('/create-employees/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;
        const employeeDataArray = req.body;
        const modifiedDataArray = employeeDataArray.map(employee => {
            employee.CompanyId = companyId;
            let sonsDetails = [];
            for (let i = 1; i <= 5; i++) {
                if (employee[`Son_${i}_Name`]) {
                    sonsDetails.push({
                        id: `Son_${i}`,
                        Son_Name: employee[`Son_${i}_Name`],
                        Son_Birthdate: employee[`Son_${i}_Birthdate`],
                        Son_Address: employee[`Son_${i}_Address`],
                        Son_Aadhar_No: employee[`Son_${i}_Aadhar_No`],
                    });
                }
            }
            let daughtersDetails = [];
            for (let i = 1; i <= 5; i++) {
                if (employee[`Daughter_${i}_Name`]) {
                    daughtersDetails.push({
                        id: `Daughter_${i}`,
                        Daughter_Name: employee[`Daughter_${i}_Name`],
                        Daughter_Birthdate: employee[`Daughter_${i}_Birthdate`],
                        Daughter_Address: employee[`Daughter_${i}_Address`],
                        Daughter_Aadhar_No: employee[`Daughter_${i}_Aadhar_No`],
                    });
                }
            }

            employee.Employee_Family_Detail = {
                Father_Name: employee.Father_Name,
                Father_Address: employee.Father_Address,
                Father_Birthdate: employee.Father_Birthdate,
                Father_Aadhar_No: employee.Father_Aadhar_No,
                Wife_Name: employee.Wife_Name,
                Wife_Birthdate: employee.Wife_Birthdate,
                Wife_Address: employee.Wife_Address,
                Wife_Aadhar_No: employee.Wife_Aadhar_No,
                SonsDetails: sonsDetails,
                DaughterDetails: daughtersDetails
            };

            employee.Employee_Salary = {
                Consolidated_Salary: employee.Consolidated_Salary,
                Pay_Rate: employee.Pay_Rate,
                DA_Rate: employee.DA_Rate,
                Per_Hour_Calculation: employee.Per_Hour_Calculation,
                Pice_Rate_Calculation: employee.Pice_Rate_Calculation,
                HRA: employee.HRA,
                Conveyance: employee.Conveyance,
                Travelling_Allowance: employee.Travelling_Allowance,
                W_LA: employee.W_LA,
                Special_Allowance: employee.Special_Allowance,
                Difference_Pay: employee.Difference_Pay,
                Allowance_Name_5: employee.Allowance_Name_5,
                Amount_Name_5: employee.Amount_Name_5,
                Other_Name: employee.Other_Name,
                Other_Amount: employee.Other_Amount,
                Gross_Salary: employee.Gross_Salary
            };

            for (let i = 1; i <= 5; i++) {
                delete employee[`Son_${i}_Name`];
                delete employee[`Son_${i}_Birthdate`];
                delete employee[`Son_${i}_Address`];
                delete employee[`Son_${i}_Aadhar_No`];
                delete employee[`Daughter_${i}_Name`];
                delete employee[`Daughter_${i}_Birthdate`];
                delete employee[`Daughter_${i}_Address`];
                delete employee[`Daughter_${i}_Aadhar_No`];
            }
            return employee;
        });

        await EmployeeModel.insertMany(modifiedDataArray);
        res.status(201).json({ message: 'Employees inserted successfully' });
    } catch (error) {
        console.error('Error inserting employees:', error);
        res.status(500).json({ message: 'Error inserting employees', error: error.message });
    }
});

router.get('/next-employee-sr', async (req, res) => {
    try {
        const lastEmployee = await EmployeeModel.findOne().sort({ Sr_emp: -1 });
        const nextSrEmp = lastEmployee && lastEmployee.Sr_emp ? lastEmployee.Sr_emp + 1 : 1;

        res.status(200).json({ nextSrEmp });
    } catch (error) {
        console.error('Error fetching next employee Sr_emp:', error);
        res.status(500).json({
            message: 'Failed to fetch next employee serial number',
            error: error.message
        });
    }
});

module.exports = router;
