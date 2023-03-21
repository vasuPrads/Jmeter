const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/your-db-name';

app.post('/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const data = req.body;
    await db.collection('your-collection-name').insertOne(data);
    res.status(201).json({ message: 'Data inserted successfully.' });
    client.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
