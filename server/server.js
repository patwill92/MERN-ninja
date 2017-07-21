import express from 'express';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const port = 3000;
const app = express();
const compiler = webpack(config);
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(path.join(__dirname,"../src")));
app.use(bodyParser.json());
app.use('/api', require('../routes/api'));

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(400).send({
    error: err.message
  });
});

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    open(`http://localhost:${port}`)
  }
});