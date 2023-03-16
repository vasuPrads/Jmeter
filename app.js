const express = require('express');
const { exec } = require('child_process');
const jmeter = require('jmeter');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/run-jmeter', (req, res) => {
  const testPath = 'path/to/your/test.jmx';
  const resultsPath = 'path/to/save/results.jtl';
  const test = jmeter.testFromFile(testPath);
  const options = { resultsFile: resultsPath };
  test.run(options, (err, result) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return res.send(`exec error: ${err}`);
    }
    console.log(`stdout: ${result}`);
    res.send(`<pre>${result}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
