const  mongoose = require("mongoose");


const CompanyOtherDetails = new mongoose.Schema({
  factory_license_no:{
    type:String
  },
  renew_date:{
    type:String
  },
  plan_passing_no:{
    type:String
  },
  plan_passing_date:{
    type:String
  },
  hp:{
    type:String
  },
  shop_license_no:{
    type:String
  },
  shop_license_date:{
    type:String
  },
  contract_labour_date:{
    type:String
  },
  contract_register_no:{
    type:String
  },
  pf_indicator:{
    type:String
  },
  esic_indicator:{
    type:String
  },
  glwf_indicator:{
    type:String
  },
  pt_indicator:{
    type:String
  },
  edli_indicator:{
    type:String
  },


  pf_application_date:{
    type:String
  },
  esic_application_date:{
    type:String
  },
  glwf_application_date:{
    type:String
  },
  pt_employer:{
    type:String
  },
  pt_employee:{
    type:String
  },
  pt_applicable_date:{
    type:String
  },
  
  company_file_detail:{
    type:String
  },
  acgr_no:{
    type:String
  },
  ext_code:{
    type:String
  },

})

const CompanySchema = new mongoose.Schema({
    company_no:{
        type:String,
    },
    company_start_date:{
        type:String
    },
    created_for:{
        type:String
    },
    company_name:{
        type:String
    },
    company_type:{
        type:String
    },
    nature_of_industry:{
        type:String
    },
    pan_no:{
        type:String
    },
    company_address:{
        type:String
    },
    city:{
        type:String
    },
    pincode:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
   R_company_address:{   //R Stands for the residance
        type:String
    },
    R_city:{
        type:String
    },
    R_pincode:{
        type:String
    },
    R_state:{
        type:String
    },
    R_country:{
        type:String
    },
    Location_Name:{
        type:String
    },
    phone_f:{
        type:String
    },
    email:{
        type:String
    },
    cont_person1:{
        type:String
    },
    mobile_1:{
        type:String
    },
    designation1:{
        type:String
    },

    cont_person2:{
        type:String
    },
    mobile_2:{
        type:String
    },
    designation2:{
        type:String
    },

   band_name:{
    type:String
   },
   bank_account:{
    type:String
   },
   ifsc_code:{
    type:String
   },


   pf_code:{
    type:String
   },
   pf_rate:{
    type:String
   },
   esic_no:{
    type:String
   },

   min_wages:{
    type:String
   },
   working_days:{
    type:String
   },
   weekly_off:{
    type:String
   },
   file_no:{
    type:String
   },
   active:{
    type:String
   },
   remarks:{
    type:String
   },
   company_other_detail:CompanyOtherDetails
    
},{
    timeseries:true,
    timestamps:true
})






 const CompanyModels = mongoose.model("Company",CompanySchema)

 module.exports=CompanyModels