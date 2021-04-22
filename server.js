// import node modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// define express app
const app = express();
// define port
const PORT = process.env.PORT || 3000;

var notes;
fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
  if (err) throw err;
  notes = JSON.parse(data);
});

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

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  var newNote = req.body;
  newNote.id = notes.length + 1;
  notes.push(newNote);

  fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), err => {
    if (err) {
      console.log(`Error creating file. Error message of: ${err}`);
    }
  });

  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  var id = req.params.id;
  var newNotes = [];
  for (let i = 0; i < notes.length; i++) {
    if (id == notes[i].id) {
      continue;
    }
    newNotes.push(notes[i]);
  }

  notes = newNotes;

  for (let i = 0; i < notes.length; i++) {
    notes[i].id = i + 1;
  }

  fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), err => {
    if (err) {
      console.log(`Error creating file. Error message of: ${err}`);
    }
  });
  res.json(notes);
});

// Initialize app
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));