const express = require('express');
const { spawn } = require('child_process');

const app = express();
const jmeterPath = `${process.env.JMETER_HOME}/bin/jmeter.bat`;

app.get('/run-jmeter', (req, res) => {
  const jmeterTestFile = 'path/to/your/test/file.jmx';
  const jmeterArgs = [
    '-n',
    '-t',
    jmeterTestFile,
    '-l',
    'results.jtl',
    '-e',
    '-o',
    'results'
  ];

  const jmeterProcess = spawn(jmeterPath, jmeterArgs);
  
  jmeterProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  jmeterProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  
  jmeterProcess.on('close', (code) => {
    console.log(`JMETER process exited with code ${code}`);
    res.sendFile(`${__dirname}/results/index.html`);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
