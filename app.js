const express = require('express');
const bodyParser = require('body-parser');

const schoolRoutes = require('./Routes/schoolRoute');


const app = express();
app.use(express.json());
app.use(bodyParser.json())

app.use('/api/v1', schoolRoutes);


module.exports = app;