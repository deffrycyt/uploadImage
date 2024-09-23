const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS for API access
app.use(cors());

// Set up storage engine for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit to 1MB
}).single('image');

// Serve static files from "uploads" folder
app.use('/uploads', express.static('uploads'));

// Home route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to handle image upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Upload failed', error: err });
    }
    // Send back the file link as response
    const fileLink = `http://localhost:3000/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Upload successful', link: fileLink });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});