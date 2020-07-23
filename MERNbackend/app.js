const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./mongo');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Alleow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
 
    next();
});


app.post('/history', mongoPractice.createHistory)

app.get('/history', mongoPractice.getHistory)

app.delete('/history', mongoPractice.deleteHistory)

app.listen(5000);