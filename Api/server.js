const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const userController = require('./Controller/userController');
const nunjucks = require('nunjucks');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

nunjucks.configure('view', {
  autoescape: true,
  express: app
});

app.get('/data', (req, res) => {

  res.render('user.html');

});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', userController);
app.set('views', __dirname + '/templates');
app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});