const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const EmpployeeSalarySchema = new mongoose.Schema({
    Consolidated_Salary:{
        type:String
    },
    Consolidated_Pay_Rate:{
        type:String
    },
    Pay_Rate:{
        type:String
    },
    DA_Rate:{
        type:String
    },
    Per_Hour_Calculation:{
        type:String
    }
    ,
    Pice_Rate_Calculation:{
        type:String
    },
    HRA:{
        type:String
    },
    Conveyance:{
        type:String
    },
    Travelling_Allowance:{
        type:String
    },
    W_LA:{
        type:String
    },
    Special_Allowance:{
        type:String
    },
    Difference_Pay:{
        type:String
    },
    Allowance_Name_5:{
        type:String
    },
    Amount_Name_5:{
        type:String
    },
    Allowance_Name_6:{
        type:String
    },
    Amount_Name_6:{
        type:String
    },
    Allowance_Name_7:{
        type:String
    },
    Amount_Name_7:{
        type:String
    },
    Allowance_Name_8:{
        type:String
    },
    Amount_Name_8:{
        type:String
    },
    Handicapped_Allowance:{
        type:String
    },
    Other_Name:{
        type:String
    },
    Other_Amount:{
        type:String
    },
    Gross_Salary:{
        type:String
    },
    

})

const EmployeeFamilyDetails = new mongoose.Schema({

    Father_Name:{
        type:String
    },
    Father_Address:{
        type:String
    },
    Father_Birthdate:{
        type:String
    },
    Father_Aadhar_No:{
        type:String
    },
        
    Husband_Name:{
        type:String
    },
    Husband_Birthdate:{
        type:String
    },
    Husband_Address:{
        type:String
    },
    Husband_Aadhar_No:{
        type:String
    },
    Wife_Name:{
        type:String
    },
    Wife_Birthdate:{
        type:String
    },
    Wife_Address:{
        type:String
    },
    Wife_Aadhar_No:{
        type:String
    },
    SonsDetails:[{
        id:{
            type:String
        },
        Son_Name:{
            type:String
        },
        Son_Birthdate:{
            type:String
        },
        Son_Address:{
            type:String
        },
        Son_Aadhar_No:{
            type:String
        },
    }],

    DaughterDetails:[{
        ids:{
            type:String
        },
        Daughter_Name:{
            type:String
        },
        Daughter_Birthdate:{
            type:String
        },
        Daughter_Address:{
            type:String
        },
        Daughter_Aadhar_No:{
            type:String
        },
    }]

})


const EmployeeSchema = new mongoose.Schema({
    Sr_emp:{
        type:Number,
        default:0
    },
    Employee_Image:{
        type:String
    },
    Employee_Sign_Image:{
     type:String
    },
    Employee_Code:{
        type:String
    },
    Name_on_Aadhar:{
        type:String
    },
    Name_First_Name:{
        type:String
    },
    Father_Name:{
        type:String
    },
    Surname_Last_Name:{
        type:String
    },
    Gender:{
        type:String
    },
    Birth_Date:{
        type:String
    },
    Marital_Status:{
        type:String
    },
    Age:{
        type:Number
    },
    Education:{
        type:String
    },
    Joining_Date:{
        type:String
    },
    Department_Name:{
        type:String
    },
    Designation_Name:{
        type:String
    },
    Branch_Name:{
        type:String
    },
    Location_Name:{
        type:String
    },
    Site_Name:{
        type:String
    },
    Contractor_Name:{
        type:String
    },
    PAN_No:{
        type:String
    },
    UAN_No:{
        type:String
    },
    Service_book_no:{
        type:String
    },
    ESIC_No:{
        type:String
    },
    Email:{
        type:String
    },
    Aadhar_No:{
        type:String
    },

    Address:{
        type:String
    },
    City:{
        type:String
    },
    Pin_Code:{
        type:String
    },
    State:{
        type:String
    },
    Country:{
        type:String
    },
    Phone_R:{
        type:String
    },
    Mobile_No:{
        type:String
    },
    PF:{
        type:String
    },
    ESIC:{
        type:String
    },
    GLWF:{
        type:String
    },
    PT:{
        type:String
    },
    Deduction_F_Pension:{
        type:String
    },
    PF_Account_No:{
        type:String
    },
    PF_Eligibility_Date:{
        type:String
    },
    ESIC_No:{
        type:String
    },
    ESIC_Expected_End_Month1:{
        type:String
    },
    ESIC_Expected_End_Year1:{
        type:String
    },
    ESIC_Expected_End_Month2:{
        type:String
    },
    ESIC_Expected_End_Year2:{
        type:String
    },
    //above model baaki chhe   client thi pucho
    Bank_Name:{
        type:String
    },
    Bank_AC_No:{
        type:Number
    },
    IFSC_Code:{
        type:String
    },
    Remarks:{
        type:String
    },
    Mark_of_Identification:{
        type:String
    },
    Employee_Salary:EmpployeeSalarySchema,
    Employee_Family_Detail:EmployeeFamilyDetails,
CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
}



}, {
  timestamps: true
});





const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
