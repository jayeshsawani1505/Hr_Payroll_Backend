const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
dotenv.config();
const PORT = process.env.PORT || 4000;

// Routes
const CompanyRoute = require('./routes/companyRoutes');
const BranchRoute = require("./routes/BranchRoutes");
const Contractor = require("./routes/Contract");
const LocationMaster = require("./routes/LocationRoutes");
const EmployeeMaster = require("./routes/EmployeeRoutes");
const CalculationMasterRoutes = require("./routes/calculationMasterRoutes")
const LogsRoutes = require("./routes/logRoutes")

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Body parsing middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://hr-payroll-frontend-ht4kbd3zm-aj-tech-solution.vercel.app'], // Specify the allowed origin or list multiple origins here
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  preflightContinue: false, // Pass the preflight response to the next handler
  optionsSuccessStatus: 204 // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests (for browsers that use OPTIONS)
app.options('*', cors(corsOptions));

// MongoDB connection
const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Not Connected", error);
  }
};
DbConnect();

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API routes
app.use("/api/v1/com", CompanyRoute);
app.use('/api/users', userRoutes);
app.use("/api/branch", BranchRoute);
app.use("/api/contract", Contractor);
app.use("/api/location", LocationMaster);
app.use("/api/employee", EmployeeMaster);
app.use('/api/calculation-master', CalculationMasterRoutes);
app.use('/api/logs', LogsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
