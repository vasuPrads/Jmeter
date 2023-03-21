import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
    };
    try {
      await axios.post('http://localhost:5000/data', data);
      setTitle('');
      setDescription('');
      alert('Data inserted successfully.');
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
