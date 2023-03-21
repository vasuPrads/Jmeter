import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data:</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <strong>Title:</strong> {item.title} <br />
            <strong>Description:</strong> {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
