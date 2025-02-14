const express = require("express");
const route = express.Router();
const stuController = require("../controllers/studentController");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Use environment variables
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,


    cloud_name: "dgc7ltpg8", // Use environment variables
    api_key: "559138412476855",
    api_secret: "Cd8zVsoh2J_7zu3-pNPrepzJpoE",
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // The folder in Cloudinary where files will be stored
    },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

// Route to save data
route.post("/datasave", upload.single('file'), async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    try {
        // Call your controller function
        await stuController.dataSave(req, res);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Route to edit and save data
route.post("/editsave", upload.single('file'), async (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    try {
        // Call your controller function
        await stuController.editDataSave(req, res);
    } catch (error) {
        console.error('Error editing data:', error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Other routes
route.get("/datadisplay", stuController.dataDisplay);
route.post("/datasearch", stuController.dataSearch);
route.get("/deleteddisplay", stuController.deleteDataDisplay);
route.post("/recordDelete", stuController.recordDelete);
route.get("/editdisplay", stuController.editDisplay);

module.exports = route;