const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Storage untuk meng-upload file ke folder public/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file yang unik
  }
});

const upload = multer({ storage: storage });

// Middleware untuk melayani file statis
app.use(express.static('public'));

// Endpoint untuk meng-handle upload gambar
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ link: fileLink });
});

// Penanganan kesalahan untuk route yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Penanganan kesalahan server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
