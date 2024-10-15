const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const BranchSchema = new mongoose.Schema({
    Branch_No:{
        type:String
    },
    Branch_Name:{
        type:String
    },
    Branch_Starting_Date:{
        type:String
    },
    Nature_of_Business:{
        type:String
    },
    Owner_Name:{
        type:String
    },
    Owner_Address:{
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
    Contact_Person_Name:{
        type:String
    },
    Mobile_No:{
        type:String
    },
    Professional_Tax_No:{
        type:String
    },
    PF_Sub_Code_No:{
        type:String
    },
    ESIC_Sub_Code_No:{
        type:String
    },
    Start_Date:{
        type:String
    },
CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
}
    
    

}, {
  timestamps: true
});





const BranchModel = mongoose.model('Branch', BranchSchema);

module.exports = BranchModel;
