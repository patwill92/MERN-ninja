const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));

//error handling middleware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(400).send({
    error: err.message
  });
});

app.listen(process.env.port || 4000, () => {
  console.log('Listening on port 4000')
});