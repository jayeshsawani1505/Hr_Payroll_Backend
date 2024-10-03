const LocationMaster = require("../models/LocationSiteModel");

 

// Create a new location
exports.createLocation = async (req, res) => {
    try {
        const location = new LocationMaster(req.body);
        await location.save();
        res.status(201).json({ message: "Location created successfully", data: location });
    } catch (error) {
        res.status(400).json({ message: "Error creating location", error: error.message });
    }
};

// Update an existing location
exports.updateLocation = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedLocation = await LocationMaster.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.json({ message: "Location updated successfully", data: updatedLocation });
    } catch (error) {
        res.status(400).json({ message: "Error updating location", error: error.message });
    }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLocation = await LocationMaster.findByIdAndDelete(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.json({ message: "Location deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting location", error: error.message });
    }
};

exports.AllLocation = async (req, res) => {
    try {
        // Fetch all locations from the database
        const AllLocation = await LocationMaster.find();

        // Check if any locations are found
        if (AllLocation.length === 0) {
            return res.status(404).json({ message: "No locations found." });
        }

       
        res.status(200).json(AllLocation);
    } catch (error) {
        
        res.status(400).json({ message: "Error fetching locations", error: error.message });
    }
};

exports.LocationView = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch location details using the ID
      const fetchedLocation = await LocationMaster.findById(id);
  
      // Check if the location exists
      if (!fetchedLocation) {
        return res.status(404).json({ message: "Location not found" });
      }
  
      // Send the fetched location data as a response
      res.status(200).json(fetchedLocation);
    } catch (error) {
      // Handle any errors
      console.log(error);
      res.status(500).json({ message: "Error fetching location", error: error.message });
    }
  };
  

