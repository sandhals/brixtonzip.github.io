// updateData.js
const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://curius.app/api/users/3954/searchLinks';
const filePath = './public/data.json'; // Update this with your desired file path

// Function to fetch data from the API and update the file
const fetchDataAndUpdateFile = async () => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to the file
    fs.writeFileSync(filePath, jsonData);

    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Call the function to fetch data and update the file
fetchDataAndUpdateFile();
