const CompanyModels = require("../models/CompanyModel");;
const xlsx = require('xlsx');
const EmployeeModel = require("../models/EmployeeModel");
const ContractorMaster = require("../models/ContractorModel");
const BranchModel = require("../models/BranchModel");
const LocationMaster = require("../models/LocationSiteModel");







const createCompany = async (req, res) => {
    try {
        const {
            company_no,
            company_start_date,
            created_for,
            company_name,
            company_type,
            nature_of_industry,
            pan_no,
            company_address,
            city,
            pincode,
            state,
            country,
            R_company_address,
            R_city,
            R_pincode,
            R_state,
            R_country,
            phone_o,
            phone_f,
            email,
            cont_person1,
            mobile_1,
            designation1,
            cont_person2,
            mobile_2,
            designation2,
            band_name,
            bank_account,
            ifsc_code,
            pf_code,
            pf_rate,
            esic_no,
            min_wages,
            working_days,
            weekly_off,
            file_no,
            active,
            remarks,
            company_other_detail,
        } = req.body;

        // Create a new company document
        const newCompany = new CompanyModels({
            company_no,
            company_start_date,
            created_for,
            company_name,
            company_type,
            nature_of_industry,
            pan_no,
            company_address,
            city,
            pincode,
            state,
            country,
            R_company_address,
            R_city,
            R_pincode,
            R_state,
            R_country,
            phone_o,
            phone_f,
            email,
            cont_person1,
            mobile_1,
            designation1,
            cont_person2,
            mobile_2,
            designation2,
            band_name,
            bank_account,
            ifsc_code,
            pf_code,
            pf_rate,
            esic_no,
            min_wages,
            working_days,
            weekly_off,
            file_no,
            active,
            remarks,
            company_other_detail,
        });

        const savedCompany = await newCompany.save();
        res.status(201).json({
            message: "Company created successfully",
            data: savedCompany,
        });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({
            message: "Failed to create company",
            error: error.message,
        });
    }
};


const CompanyList = async (req, res) => {
    try {
      const companies = await CompanyModels.find({}, { company_name: 1, _id: 1 });
      res.status(200).json(companies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  };
  

  const createBulkCompanies = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        const companiesToInsert = jsonData.map(row => ({
            company_no: row.company_no,
            company_start_date: row.company_start_date,
            created_for: row.created_for,
            company_name: row.company_name,
            company_type: row.company_type,
            nature_of_industry: row.nature_of_industry,
            pan_no: row.pan_no,
            company_address: row.company_address,
            city: row.city,
            pincode: row.pincode,
            state: row.state,
            country: row.country,
            R_company_address: row.R_company_address,
            R_city: row.R_city,
            R_pincode: row.R_pincode,
            R_state: row.R_state,
            R_country: row.R_country,
            phone_o: row.phone_o,
            phone_f: row.phone_f,
            email: row.email,
            cont_person1: row.cont_person1,
            mobile_1: row.mobile_1,
            designation1: row.designation1,
            cont_person2: row.cont_person2,
            mobile_2: row.mobile_2,
            designation2: row.designation2,
            band_name: row.band_name,
            bank_account: row.bank_account,
            ifsc_code: row.ifsc_code,
            pf_code: row.pf_code,
            pf_rate: row.pf_rate,
            esic_no: row.esic_no,
            min_wages: row.min_wages,
            working_days: row.working_days,
            weekly_off: row.weekly_off,
            file_no: row.file_no,
            active: row.active,
            remarks: row.remarks,
            company_other_detail: {
                factory_license_no: row.factory_license_no,
                renew_date: row.renew_date,
                plan_passing_no: row.plan_passing_no,
                plan_passing_date: row.plan_passing_date,
                hp: row.hp,
                shop_license_no: row.shop_license_no,
                shop_license_date: row.shop_license_date,
                contract_labour_date: row.contract_labour_date,
                contract_register_no: row.contract_register_no,
                pf_indicator: row.pf_indicator,
                esic_indicator: row.esic_indicator,
                glwf_indicator: row.glwf_indicator,
                pt_indicator: row.pt_indicator,
                edli_indicator: row.edli_indicator,
                pf_application_date: row.pf_application_date,
                esic_application_date: row.esic_application_date,
                glwf_application_date: row.glwf_no,
                pt_employer: row.pt_employer,
                pt_employee: row.pt_employee,
                pt_applicable_date: row.pt_applicable_date,
                company_file_detail: row.company_file_detail,
                acgr_no: row.acgr_no,
                ext_code: row.ext_code,
            }
        }));

        // Return companies data for confirmation
        res.status(200).json({ message: 'Companies data parsed successfully', data: companiesToInsert });
    } catch (error) {
        console.error('Error uploading companies:', error);
        res.status(500).json({ message: 'Failed to upload companies', error: error.message });
    }
};


const CompanyView = async (req,res)=>{
    try{
        const {company_id} = req.body
        const CompanyDetails = await CompanyModels.find({_id:company_id})
        

        return res.status(200).json({message:"Company Fetched Successfully",CompanyDetails})

    }catch(error){
        return res.status(400).json({message:error})
    }
}



const updateCompany = async (req, res) => {
    try {
        const {
            company_id,
            company_no,
            company_start_date,
            created_for,
            company_name,
            company_type,
            nature_of_industry,
            pan_no,
            company_address,
            city,
            pincode,
            state,
            country,
            R_company_address,
            R_city,
            R_pincode,
            R_state,
            R_country,
            phone_o,
            phone_f,
            email,
            cont_person1,
            mobile_1,
            designation1,
            cont_person2,
            mobile_2,
            designation2,
            band_name,
            bank_account,
            ifsc_code,
            pf_code,
            pf_rate,
            esic_no,
            min_wages,
            working_days,
            weekly_off,
            file_no,
            active,
            remarks,
            company_other_detail,
        } = req.body;

        const existingCompany = await CompanyModels.findById(company_id);
        if (!existingCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        const updatedCompany = await CompanyModels.findByIdAndUpdate(
            company_id,
            {
                
                company_no,
                company_start_date,
                created_for,
                company_name,
                company_type,
                nature_of_industry,
                pan_no,
                company_address,
                city,
                pincode,
                state,
                country,
                R_company_address,
                R_city,
                R_pincode,
                R_state,
                R_country,
                phone_o,
                phone_f,
                email,
                cont_person1,
                mobile_1,
                designation1,
                cont_person2,
                mobile_2,
                designation2,
                band_name,
                bank_account,
                ifsc_code,
                pf_code,
                pf_rate,
                esic_no,
                min_wages,
                working_days,
                weekly_off,
                file_no,
                active,
                remarks,
                company_other_detail,
            },
            { new: true } 
        );

        res.status(200).json({
            message: "Company updated successfully",
            data: updatedCompany,
        });
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({
            message: "Failed to update company",
            error: error.message,
        });
    }
};


const DeleteCompany = async (req, res) => {
    try {
      const { company_delete } = req.body;
  
      await CompanyModels.findByIdAndDelete(company_delete);
      await EmployeeModel.deleteMany({ CompanyId: company_delete });
      await ContractorMaster.deleteMany({ CompanyId: company_delete });
      await BranchModel.deleteMany({ CompanyId: company_delete });
      await LocationMaster.deleteMany({ CompanyId: company_delete });
  
      return res.status(200).json({ message: "Company and related records deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };




  const NextCompanyNumber = async(req,res)=>{
    try {
        const lastCompany = await CompanyModels.findOne().sort({ company_no: -1 });
    
        if (lastCompany && lastCompany.company_no) {
          let nextCompanyNo = (parseInt(lastCompany.company_no) + 1).toString();
          res.json({ nextCompanyNo });
        } else {
          res.json({ nextCompanyNo: "1" });
        }
      } catch (error) {
        console.error("Error fetching company data: ", error);
        res.status(500).json({ error: "Server error" });
      }
  }
  
  
module.exports={
    createCompany,
    CompanyList,
    createBulkCompanies,
    CompanyView,
    updateCompany,
    DeleteCompany,
    NextCompanyNumber
    
}