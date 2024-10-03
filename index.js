const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes');
dotenv.config()
const PORT = process.env.PORT || 4000


//routes
const CompanyRoute = require('./routes/companyRoutes')
const BranchRoute = require("./routes/BranchRoutes")
const Contractor = require("./routes/Contract")
const LocationMaster = require("./routes/LocationRoutes")
const EmployeeMaster = require("./routes/EmployeeRoutes")

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Function to generate a dummy Excel file
// const generateDummyExcel = () => {
//   // Define headers and some dummy data for the Excel file
//   const data = [
//     [
//       'company_no', 'company_start_date', 'created_for', 'company_name', 'company_type', 'nature_of_industry', 'pan_no', 'company_address',
//       'city', 'pincode', 'state', 'country', 'R_company_address', 'R_city', 'R_pincode', 'R_state', 'R_country', 'phone_o', 'phone_f',
//       'email', 'cont_person1', 'mobile_1', 'designation1', 'cont_person2', 'mobile_2', 'designation2', 'band_name', 'bank_account',
//       'ifsc_code', 'pf_code', 'pf_rate', 'esic_no', 'min_wages', 'working_days', 'weekly_off', 'file_no', 'active', 'remarks',
//       'factory_license_no', 'renew_date', 'plan_passing_no', 'plan_passing_date', 'hp', 'shop_license_no', 'shop_license_date',
//       'contract_labour_date', 'contract_register_no', 'pf_indicator', 'esic_indicator', 'glwf_indicator', 'pt_indicator', 'edli_indicator',
//       'pf_application_date', 'esic_application_date', 'glwf_no', 'pt_employer', 'pt_employee', 'pt_applicable_date',
//       'company_file_detail', 'acgr_no', 'ext_code'
//     ],
//     [
//       '001', '2023-01-01', 'Company 1', 'Test Company A', 'Private', 'IT', 'ABCDE1234F', '123 Street, City', 'City A', '123456', 'State A', 'Country A',
//       '456 Street, City', 'City B', '654321', 'State B', 'Country B', '1234567890', '0987654321', 'email@test.com', 'Person A', '9876543210',
//       'Manager', 'Person B', '8765432109', 'Assistant Manager', 'Test Bank', '123456789', 'IFSC0001234', 'PF001', '12%', 'ESIC001', '15000', '22',
//       'Sunday', 'File001', 'Yes', 'Sample remarks', 'FL001', '2023-02-01', 'PP001', '2023-03-01', '100', 'SL001', '2023-04-01', '2023-05-01',
//       'CL001', 'Yes', 'Yes', 'Yes', 'No', 'No', '2023-06-01', '2023-07-01', '2023-08-01', '500', '50', '2023-09-01', 'FileDetails001', 'ACGR001',
//       'EXT001'
//     ],
// ]

//   // Create a new workbook
//   const workbook = xlsx.utils.book_new();
  
//   // Convert the data to a worksheet
//   const worksheet = xlsx.utils.aoa_to_sheet(data);

//   // Add the worksheet to the workbook
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Companies');

//   // Define the path where the file will be saved
//   const filePath = path.join(__dirname, 'dummy_companies.xlsx');

//   // Write the Excel file
//   xlsx.writeFile(workbook, filePath);

//   console.log(`Dummy Excel file generated at: ${filePath}`);
// };

// Call the function to generate the dummy Excel
// generateDummyExcel();


// const createExcelFromLocationMaster = () => {
//   // Define headers from the model schema fields
//   const headers = [
//       'Location_No',
//       'Phone_o',
//       'Phone_f',
//       'Address',
//       'City',
//       'Pin_Code',
//       'State',
//       'Country'
//   ];

//   // Create some dummy data
//   const dummyData = [
//       {
//           Location_No: 'LOC001',
//           Phone_o: '1234567890',
//           Phone_f: '0987654321',
//           Address: '123 Main St',
//           City: 'Sample City',
//           Pin_Code: '123456',
//           State: 'Sample State',
//           Country: 'Sample Country'
//       },
//       {
//           Location_No: 'LOC002',
//           Phone_o: '1111111111',
//           Phone_f: '2222222222',
//           Address: '456 Side St',
//           City: 'Another City',
//           Pin_Code: '654321',
//           State: 'Another State',
//           Country: 'Another Country'
//       }
//   ];

//   // Create a new workbook and worksheet
//   const workbook = xlsx.utils.book_new();
//   const worksheet = xlsx.utils.json_to_sheet(dummyData, { header: headers });

//   // Add the worksheet to the workbook
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Locations');

//   // Define the file path
//   const filePath = path.join(__dirname, 'LocationMasterData.xlsx');

//   // Write the workbook to a file
//   xlsx.writeFile(workbook, filePath);

//   console.log(`Excel file created at: ${filePath}`);
// };

// // Call the function to create the Excel file
// createExcelFromLocationMaster();







// const createExcelFromContractorMaster = () => {
//   // Define headers from the model schema fields
//   const headers = [
//       'Contractor_No',
//       'Name',
//       'PAN_Card_No',
//       'No_of_labour_engaged',
//       'Address',
//       'City',
//       'Pin_Code',
//       'State',
//       'Country',
//       'Phone_o',
//       'Phone_f',
//       'Mobile_No',
//       'Contact_Person_Name',
//       'Owner_Name',
//       'Owner_Address',
//       'PF_code',
//       'License_No',
//       'ESIC_No',
//       'License_Date_Of_Issue',
//       'License_Date_Of_Renew',
//       'Starting_Contract_Date',
//       'Renew_Date_Of_Contract',
//       'Pay_Roll_Start_Date'
//   ];

//   // Create some dummy data
//   const dummyData = [
//       {
//           Contractor_No: 'C001',
//           Name: 'John Contractors',
//           PAN_Card_No: 'ABCDE1234F',
//           No_of_labour_engaged: '50',
//           Address: '123 Main St',
//           City: 'CityX',
//           Pin_Code: '123456',
//           State: 'StateY',
//           Country: 'CountryZ',
//           Phone_o: '1234567890',
//           Phone_f: '0987654321',
//           Mobile_No: '9876543210',
//           Contact_Person_Name: 'John Doe',
//           Owner_Name: 'Jane Doe',
//           Owner_Address: '456 Side St',
//           PF_code: 'PF12345',
//           License_No: 'LIC1234567',
//           ESIC_No: 'ESIC987654',
//           License_Date_Of_Issue: '2020-01-01',
//           License_Date_Of_Renew: '2023-01-01',
//           Starting_Contract_Date: '2020-06-01',
//           Renew_Date_Of_Contract: '2023-06-01',
//           Pay_Roll_Start_Date: '2020-07-01'
//       },
//       {
//           Contractor_No: 'C002',
//           Name: 'ABC Builders',
//           PAN_Card_No: 'WXYZ5678K',
//           No_of_labour_engaged: '100',
//           Address: '789 New Ave',
//           City: 'CityY',
//           Pin_Code: '654321',
//           State: 'StateZ',
//           Country: 'CountryX',
//           Phone_o: '1122334455',
//           Phone_f: '9988776655',
//           Mobile_No: '8899776655',
//           Contact_Person_Name: 'Alice Smith',
//           Owner_Name: 'Bob Smith',
//           Owner_Address: '321 Side Rd',
//           PF_code: 'PF67890',
//           License_No: 'LIC9876543',
//           ESIC_No: 'ESIC123456',
//           License_Date_Of_Issue: '2019-03-15',
//           License_Date_Of_Renew: '2022-03-15',
//           Starting_Contract_Date: '2019-04-01',
//           Renew_Date_Of_Contract: '2022-04-01',
//           Pay_Roll_Start_Date: '2019-05-01'
//       }
//   ];

//   // Create a new workbook and worksheet
//   const workbook = xlsx.utils.book_new();
//   const worksheet = xlsx.utils.json_to_sheet(dummyData, { header: headers });

//   // Add the worksheet to the workbook
//   xlsx.utils.book_append_sheet(workbook, worksheet, 'Contractors');

//   // Define the file path
//   const filePath = path.join(__dirname, 'ContractorMasterData.xlsx');

//   // Write the workbook to a file
//   xlsx.writeFile(workbook, filePath);

//   console.log(`Excel file created at: ${filePath}`);
// };

// // Call the function to create the Excel file
// createExcelFromContractorMaster();


// const branchData = [
//   {
//       Branch_No: "BR001",
//       Branch_Name: "Main Branch",
//       Branch_Starting_Date: "01-01-2020",
//       Nature_of_Business: "Retail",
//       Owner_Name: "John Doe",
//       Owner_Address: "123 Main St, City A",
//       Address: "456 Commerce St",
//       City: "City A",
//       Pin_Code: "123456",
//       State: "State A",
//       Country: "Country A",
//       Phone_o: "1234567890",
//       Phone_f: "0987654321",
//       Contact_Person_Name: "Jane Smith",
//       Mobile_No: "9876543210",
//       Professional_Tax_No: "PTX12345",
//       PF_Sub_Code_No: "PF12345",
//       ESIC_Sub_Code_No: "ESIC54321",
//       Start_Date: "01-02-2020"
//   },
//   {
//       Branch_No: "BR002",
//       Branch_Name: "Secondary Branch",
//       Branch_Starting_Date: "01-06-2021",
//       Nature_of_Business: "Wholesale",
//       Owner_Name: "Alice Doe",
//       Owner_Address: "789 Business Ave, City B",
//       Address: "123 Market St",
//       City: "City B",
//       Pin_Code: "654321",
//       State: "State B",
//       Country: "Country B",
//       Phone_o: "0987654321",
//       Phone_f: "1234567890",
//       Contact_Person_Name: "Bob Johnson",
//       Mobile_No: "9123456789",
//       Professional_Tax_No: "PTX67890",
//       PF_Sub_Code_No: "PF54321",
//       ESIC_Sub_Code_No: "ESIC98765",
//       Start_Date: "01-07-2021"
//   }
// ];

// // Function to generate Excel file
// const generateDummyExcel = () => {
//   const worksheet = XLSX.utils.json_to_sheet(branchData); 
//   const workbook = XLSX.utils.book_new(); 
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Branches"); 

//   const filePath = path.join(__dirname, 'dummyBranchData.xlsx');
//   XLSX.writeFile(workbook, filePath); // Write to file

//   console.log(`Excel file created at: ${filePath}`);
// };

// generateDummyExcel();
// const generateDummyExcel = () => {
//   const employeeTemplate = [
//       {
//           "Sr_emp": 1,
//           "Employee_Image": "",
//           "Employee_Sign_Image": "",
//           "Employee_Code": "EMP001",
//           "Name_on_Aadhar": "John Doe",
//           "Name_First_Name": "John",
//           "Surname_Last_Name": "Doe",
//           "Gender": "Male",
//           "Birth_Date": "1990-01-01",
//           "Marital_Status": "Single",
//           "Age": 30,
//           "Education": "Graduate",
//           "Joining_Date": "2020-01-01",
//           "Department_Name": "HR",
//           "Designation_Name": "Manager",
//           "Branch_Name": "Main",
//           "Location_Name": "NY",
//           "Site_Name": "NY Site",
//           "Contractor_Name": "XYZ Ltd.",
//           "PAN_No": "ABCDE1234F",
//           "UAN_No": "123456789012",
//           "Service_book_no": "SB123",
//           "ESIC_No": "ESIC1234",
//           "Email": "john.doe@example.com",
//           "Aadhar_No": "123456789012",
//           "Address": "123, Some Street",
//           "City": "New York",
//           "Pin_Code": "10001",
//           "State": "NY",
//           "Country": "USA",
//           "Phone_R": "1234567890",
//           "Mobile_No": "9876543210",
//           "Bank_Name": "Bank of America",
//           "Bank_AC_No": 1234567890,
//           "IFSC_Code": "BOFAUS3N",
//           "Remarks": "",
//           "Mark_of_Identification": "Mole on left hand",
          
//           // Employee Salary Details
//           "Consolidated_Salary": "5000",
//           "Pay_Rate": "Hourly",
//           "DA_Rate": "10%",
//           "Per_Hour_Calculation": "Yes",
//           "Pice_Rate_Calculation": "No",
//           "HRA": "500",
//           "Conveyance": "200",
//           "Travelling_Allowance": "300",
//           "W_LA": "100",
//           "Special_Allowance": "400",
//           "Difference_Pay": "0",
//           "Allowance_Name_5": "Bonus",
//           "Amount_Name_5": "500",
//           "Allowance_Name_6": "",
//           "Amount_Name_6": "",
//           "Allowance_Name_7": "",
//           "Amount_Name_7": "",
//           "Allowance_Name_8": "",
//           "Amount_Name_8": "",
//           "Handicapped_Allowance": "0",
//           "Other_Name": "Overtime",
//           "Other_Amount": "100",
//           "Gross_Salary": "6100",

//           // Family Details
//           "Father_Name": "Robert Doe",
//           "Father_Address": "456, Some Avenue",
//           "Father_Birthdate": "1960-05-12",
//           "Father_Aadhar_No": "123456789123",
//           "Husband_Name": "",
//           "Husband_Birthdate": "",
//           "Husband_Address": "",
//           "Husband_Aadhar_No": "",
//           "Wife_Name": "Jane Doe",
//           "Wife_Birthdate": "1992-05-25",
//           "Wife_Address": "123, Some Street",
//           "Wife_Aadhar_No": "987654321987",

//           // Sons Details (up to 5)
//           "Son_1_Name": "Son1",
//           "Son_1_Birthdate": "2010-01-01",
//           "Son_1_Address": "123, Some Street",
//           "Son_1_Aadhar_No": "111122223333",
//           "Son_2_Name": "",
//           "Son_2_Birthdate": "",
//           "Son_2_Address": "",
//           "Son_2_Aadhar_No": "",
//           "Son_3_Name": "",
//           "Son_3_Birthdate": "",
//           "Son_3_Address": "",
//           "Son_3_Aadhar_No": "",
//           "Son_4_Name": "",
//           "Son_4_Birthdate": "",
//           "Son_4_Address": "",
//           "Son_4_Aadhar_No": "",
//           "Son_5_Name": "",
//           "Son_5_Birthdate": "",
//           "Son_5_Address": "",
//           "Son_5_Aadhar_No": "",

//           // Daughters Details (up to 5)
//           "Daughter_1_Name": "Daughter1",
//           "Daughter_1_Birthdate": "2012-05-15",
//           "Daughter_1_Address": "123, Some Street",
//           "Daughter_1_Aadhar_No": "444455556666",
//           "Daughter_2_Name": "",
//           "Daughter_2_Birthdate": "",
//           "Daughter_2_Address": "",
//           "Daughter_2_Aadhar_No": "",
//           "Daughter_3_Name": "",
//           "Daughter_3_Birthdate": "",
//           "Daughter_3_Address": "",
//           "Daughter_3_Aadhar_No": "",
//           "Daughter_4_Name": "",
//           "Daughter_4_Birthdate": "",
//           "Daughter_4_Address": "",
//           "Daughter_4_Aadhar_No": "",
//           "Daughter_5_Name": "",
//           "Daughter_5_Birthdate": "",
//           "Daughter_5_Address": "",
//           "Daughter_5_Aadhar_No": "",
//       }
//   ];

//   // Create worksheet from the employee template
//   const worksheet = XLSX.utils.json_to_sheet(employeeTemplate);
  
//   // Create a new workbook
//   const workbook = XLSX.utils.book_new();
  
//   // Append the worksheet to the workbook
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  
//   // Write workbook to a file
//   XLSX.writeFile(workbook, "EmployeeTemplate.xlsx");
// };

// // Generate the Excel template
// generateDummyExcel();



app.use(express.json())
app.use(cors({origin:"*"}))


const DbConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Database Connected Successfully");
    } catch (error) {
      console.log("Database Not Connected", error);  
    }
  };
  DbConnect();


  app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use("/api/v1/com",CompanyRoute)
app.use('/api/users', userRoutes);
app.use("/api/branch",BranchRoute)
app.use("/api/contract",Contractor)
app.use("/api/location",LocationMaster)
app.use("/api/employee",EmployeeMaster)







app.listen(PORT ,()=>{
    console.log(`Server Running On Port ${PORT}`)
})