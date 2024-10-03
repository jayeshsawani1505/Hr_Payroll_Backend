const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const LocationSiteSchema = new mongoose.Schema({
    Location_No:{
        type:String
    },
    Phone_o:{
        type:String
    },
    Phone_f:{
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
    CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
}
}, {
  timestamps: true
});





const LocationMaster = mongoose.model('Location', LocationSiteSchema);

module.exports = LocationMaster;
