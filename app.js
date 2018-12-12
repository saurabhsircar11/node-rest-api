const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const packageRoutes = require('./api/routes/package');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(cors());
app.use('/package', packageRoutes);

module.exports = app