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

var config = require('./config');

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParse());

app.mongoose = require('mongoose');
app.mongoose.connect(config.mongo.url);

var twilio = require('twilio')(config.twilio.appId, config.twilio.auth);

app.get('/', function (req, res) {
  res.render('index');
})

///sign up/sign in
app.post('/signUp', function (req, res) {
  console.log(req.body);
  res.send('signup');
});

app.post('/signIn', function (req, res) {
  console.log(req.body);
  res.send('signin');
});

///new list, get list of lists
app.post('/users/:id/lists', function (req, res) {
  console.log(req.body);
  res.send('post list');
});
app.get('/users/:id/lists', function (req, res) {
  console.log(req.body);
  res.send('get lists');
});

///get list by id
app.get('/users/:id/lists/:listId', function (req, res) {
  console.log(req.body);
  res.send('get list by id');
});
app.put('/users/:id/lists/:listId', function (req, res) {
  console.log(req.body);
  res.send('update list');
});
app.delete('/users/:id/lists/:listId', function (req, res) {
  console.log(req.body);
  res.send('delete list');
});

///add/remove numbers on list
app.post('/users/:id/lists/:listId/:phonenumber', function (req, res) {
  console.log(req.body);
  res.send('add phone to list');
});
app.delete('/users/:id/lists/:listId/:phonenumber', function (req, res) {
  console.log(req.body);
  res.send('remove phone from list');
});

/// see list of past messages
app.get('/users/:id/history', function (req, res) {
  console.log(req.body);
  res.send('get history');
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
    from: config.twilio.from,
    body: (req.params.message || 'Hi Megan!')
  }, function (err, msg) {
    console.log(err, msg);
    res.json(msg);
  });
});


app.listen(process.env.PORT || 5000, function () {
  console.log('listening');
});
