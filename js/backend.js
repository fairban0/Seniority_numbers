// This is the backend JavaScript
let express = require('express');
// Create express object
let app = express();
// Get path
let path = require('path');
let port = 3000;
// Serve static files from the project root
app.use(express.static(path.join(__dirname, '..'))); // Serves files from the root directory

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log('I am listening')); // uses two parameters (port and an arrow function that the server will do)