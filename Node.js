const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const app = express();

app.post('/upload', upload.array(['jmx', 'userProperties']), function(req, res) {
  const jmx = req.files.find(file => file.fieldname === 'jmx');
  const userProperties = req.files.find(file => file.fieldname === 'userProperties');

  const collection = db.collection('tests');
  collection.insertOne({ jmx: { name: jmx.originalname, content: jmx.buffer.toString() }, userProperties: { name: userProperties.originalname, content: userProperties.buffer.toString() } }, function(err, result) {
    if (err) throw err;
    res.json({ message: 'Files uploaded successfully' });
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
