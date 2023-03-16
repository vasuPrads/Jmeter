const express = require('express');
const app = express();
const { exec } = require('child_process');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/jmeter', upload.fields([{ name: 'jmxFile', maxCount: 1 }, { name: 'propertiesFile', maxCount: 1 }]), (req, res) => {
  const jmxFilePath = path.join(__dirname, 'uploads', req.files.jmxFile[0].filename);
  const propertiesFilePath = path.join(__dirname, 'uploads', req.files.propertiesFile[0].filename);

  exec(`jmeter -n -t ${jmxFilePath} -q ${propertiesFilePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});
