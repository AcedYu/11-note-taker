// import node modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// define express app
const app = express();
// define port
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the express app to be able to access this folder (specifically used to get the CSS for one of the pages)
app.use(express.static(path.join(__dirname, '/public')));

// Default navigates to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// get request for notes navigates to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Initialize app
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));