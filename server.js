const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

// Upload File
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

// Publish News
let news = [];
app.post('/publish-news', (req, res) => {
    const { title, content } = req.body;
    news.push({ title, content });
    res.send('News published successfully!');
});

// Serve News and Files
app.get('/news', (req, res) => res.json(news));
app.get('/files', (req, res) => {
    const fs = require('fs');
    const files = fs.readdirSync(path.join(__dirname, 'uploads'));
    res.json(files);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));