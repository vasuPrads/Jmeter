import React from 'react';
import axios from 'axios';

function JMeterButton() {
  const handleJMeterButtonClick = async () => {
    try {
      // Send a GET request to the start-jmeter route
      const response = await axios.get('/start-jmeter');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleJMeterButtonClick}>
      Start JMETER
    </button>
  );
}

export default JMeterButton;
