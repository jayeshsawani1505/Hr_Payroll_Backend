const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const ContractorMasterSchema = new mongoose.Schema({
    Contractor_No:{
        type:String
    },
    Name:{
        type:String
    },
    PAN_Card_No:{
        type:String
    },
    No_of_labour_engaged:{
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
    Location_Name:{
        type:String
    },
    Phone_f:{
        type:String
    },
    Mobile_No:{
        type:String
    },
    Contact_Person_Name:{
        type:String
    },
    Owner_Name:{
        type:String
    },
    Owner_Address:{
        type:String
    },
    PF_code:{
        type:String
    },
    License_No:{
        type:String
    },
    ESIC_No:{
        type:String
    },
    License_Date_Of_Issue:{
        type:String
    },
    License_Date_Of_Renew:{
        type:String
    },
    Starting_Contract_Date:{
        type:String
    },
    Renew_Date_Of_Contract:{
        type:String
    },
    Pay_Roll_Start_Date:{
        type:String
    },
    
    CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
}


    
    

}, {
  timestamps: true
});





const ContractorMaster = mongoose.model('Contractor', ContractorMasterSchema);

module.exports = ContractorMaster;
