const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const uri = 'mongodb://<username>:<password>@<mongodb-host>:<port>/<database-name>';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// API endpoints
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users', (req, res) => {
  const collection = client.db('<database-name>').collection('users');
  collection.find().toArray((err, result) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.post('/users', (req, res) => {
  const collection = client.db('<database-name>').collection('users');
  const user = req.body;

  collection.insertOne(user, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result.ops[0]);
  });
});

// Start the server
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  app.listen(port, () => {
    console.log(`Server is running on port $3000`);
  });
});

