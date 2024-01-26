// app.js
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3000; // Choose the port you want

const apiUrl = 'https://curius.app/api/users/3954/searchLinks';
const filePath = './public/data.json';

app.get('/', async (req, res) => {
  try {
    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    console.log('Data updated successfully.');

    // Send a response to the client
    res.send('Data updated successfully.');
  } catch (error) {
    console.error('Error fetching data:', error.message);

    // Send an error response to the client
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
