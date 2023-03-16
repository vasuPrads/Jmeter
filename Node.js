// Import required packages
const express = require('express');
const { spawn } = require('child_process');

// Initialize the express app
const app = express();

// Set up the route for the JMETER button click event
app.get('/start-jmeter', (req, res) => {
  // Set the path to the JMETER and test plan files
  const jmeterPath = '/path/to/jmeter/bin/jmeter.sh';
  const testPlanPath = '/path/to/test-plan.jmx';

  // Spawn a new process to start the JMETER application with the test plan
  const jmeterProcess = spawn(jmeterPath, ['-n', '-t', testPlanPath]);

  // Handle any errors that may occur
  jmeterProcess.on('error', (err) => {
    console.error(err);
    res.status(500).send('An error occurred while starting JMETER');
  });

  // Handle the exit event of the JMETER process
  jmeterProcess.on('exit', (code, signal) => {
    console.log(`JMETER process exited with code ${code} and signal ${signal}`);
  });

  // Send a response to the client
  res.send('JMETER has started successfully!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
