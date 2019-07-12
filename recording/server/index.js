const path = require('path');
const app = require('express')();
const multer = require('multer');

const PORT = process.env.PORT || 4000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName)
  }
});
const upload = multer({ storage });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post('/uploads', upload.single('rec'), (req, res, next) => {
  console.log('File received.', req.file);
  res.send(req.file);
})

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
