const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const candleRoutes = require('./routes/candleRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/candles', candleRoutes);

module.exports = app;