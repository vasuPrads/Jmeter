import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function FileUploader(props) {
  const [files, setFiles] = useState([]);

  function onDrop(acceptedFiles) {
    setFiles(acceptedFiles);
  }

  function uploadFiles() {
    const formData = new FormData();
    formData.append('jmx', files[0]);
    formData.append('userProperties', files[1]);

    fetch('/upload', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop JMX and User.Properties files here, or click to select files</p>
            {files.map(file => (
              <p key={file.name}>{file.name}</p>
      </div>
    )}
  </Dropzone>
  <button onClick={uploadFiles}>Upload files</button>
</div>
