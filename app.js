import React from 'react';

function JMeterButton() {
  const handleJMeterButtonClick = async () => {
    // Set the path to the JMETER and test plan files
    const jmeterPath = 'C:\\path\\to\\jmeter\\bin\\jmeter.bat';
    const testPlanPath = 'C:\\path\\to\\test-plan.jmx';

    // Launch the JMETER with the test plan
    const { spawn } = window.require('child_process');
    spawn('cmd.exe', ['/c', jmeterPath, '-n', '-t', testPlanPath], { detached: true, stdio: 'ignore' });
  };

  return (
    <button onClick={handleJMeterButtonClick}>
      Start JMETER
    </button>
  );
}

export default JMeterButton;
