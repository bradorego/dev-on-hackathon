var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
var crypto = require('crypto');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var UserModel = require('./models/user');
var path = require('path');


app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParse());

app.mongoose = require('mongoose');
app.mongoose.connect('mongodb://node:node@ds053090.mongolab.com:53090/africasms');

var twilio = require('twilio')('ACb293bc8a8bffe39492782efa3f0571da', '3d14e2345123511d56ca17f52e3cada9');

app.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/signup/:email/:pass', function (req, res) {
  console.log(req.params);
  var user = new UserModel({
    'email': req.params.email,
    'password': crypto.createHash('sha1').update(req.params.pass).digest('hex'),
    'distributionLists': [],
    'pastMessages': []
  });

  user.save(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

app.get('/signin/:email/:pass', function (req, res) {
  var user = UserModel.findOne({'email': req.params.email}, function (err, user) {
    if (err) {
      res.status(500);
      res.end(err);
    } else {
      if (!user) {
        res.end('not found');
      } else if (crypto.createHash('sha1').update(req.params.pass).digest('hex') === user.password) {
        res.json(user);
      } else {
        res.end('bad password');
      }
    }
  });
});

app.get('/sendTest/:message', function (req, res) {
  twilio.messages.create({
    to: '+16082865582',
    from: '+16082607469',
    body: (req.params.message || 'Hi Megan!')
  }, function (err, msg) {
    console.log(err, msg);
    res.json(msg);
  });
});








app.listen(process.env.PORT || 5000, function () {
  console.log('listening');
});
