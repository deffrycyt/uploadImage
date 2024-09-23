const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');

// Middleware untuk mengizinkan request dari domain front-end
app.use(cors({
  origin: 'https://upload-image-zeta.vercel.app'
}));

// Setting up Multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route untuk upload file
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Buat link ke gambar yang di-upload
  const fileLink = `https://upload-image-zeta.vercel.app/uploads/${req.file.filename}`;
  res.json({ link: fileLink });
});

// Jalankan server di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});