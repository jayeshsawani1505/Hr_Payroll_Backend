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

app.use(express.json())
app.use(cors({ origin: "*" }))


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

app.use("/api/v1/com", CompanyRoute)
app.use('/api/users', userRoutes);
app.use("/api/branch", BranchRoute)
app.use("/api/contract", Contractor)
app.use("/api/location", LocationMaster)
app.use("/api/employee", EmployeeMaster)

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`)
})