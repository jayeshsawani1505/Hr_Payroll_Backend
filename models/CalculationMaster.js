const mongoose = require('mongoose');

const calculationMasterSchema = new mongoose.Schema({
    PF_Type: { type: String, required: true },
    Limit_Amount: { type: Number, required: true },
    PF_Fund: { type: Number, required: true },
    Family_Pension_Fund: { type: Number, required: true },
    Employer_PF: { type: Number, required: true },
    AC_1_Percent: { type: Number, required: true },
    AC_2_Percent: { type: Number, required: true },
    AC_2_Min_Amount: { type: Number, required: true },
    AC_10_FPP: { type: Number, required: true },
    AC_21_Percent: { type: Number, required: true },
    AC_21_Max_Amount: { type: Number, required: true },
    AC_22_Percent: { type: Number, required: true },
    AC_22_Min_Amount: { type: Number, required: true },
    CompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
}, { timestamps: true });

module.exports = mongoose.model('CalculationMaster', calculationMasterSchema);
