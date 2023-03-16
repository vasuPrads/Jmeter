import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jmxFile: null,
      propertiesFile: null,
      result: '',
    };
    this.handleJmeterClick = this.handleJmeterClick.bind(this);
    this.handleJmxFileChange = this.handleJmxFileChange.bind(this);
    this.handlePropertiesFileChange = this.handlePropertiesFileChange.bind(this);
  }

  handleJmxFileChange(event) {
    this.setState({ jmxFile: event.target.files[0] });
  }

  handlePropertiesFileChange(event) {
    this.setState({ propertiesFile: event.target.files[0] });
  }

  handleJmeterClick() {
    const formData = new FormData();
    formData.append('jmxFile', this.state.jmxFile);
    formData.append('propertiesFile', this.state.propertiesFile);

    axios.post('/jmeter', formData).then((res) => {
      this.setState({ result: res.data });
    });
  }

  render() {
    return (
      <div>
        <div>
          <input type="file" onChange={this.handleJmxFileChange} />
          <input type="file" onChange={this.handlePropertiesFileChange} />
          <button onClick={this.handleJmeterClick}>Start JMETER</button>
        </div>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default App;
