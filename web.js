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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});


app.mongoose = require('mongoose');
app.mongoose.connect(config.mongo.url);

var twilio = require('twilio')(config.twilio.appId, config.twilio.auth);

// app.get('/', function (req, res) {
//   res.render('index');
// });

///sign up/sign in
app.post('/signUp', function (req, res) {
  var user = new UserModel({
    'email': req.body.email,
    'password': crypto.createHash('sha1').update(req.body.password).digest('hex'),
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
app.post('/signIn', function (req, res) {
  UserModel.findOne({'email': req.body.email}, function (err, user) {
    if (err) {
      res.status(500);
      res.end(err);
    } else {
      if (!user) {
        res.json({
          'code': 101,
          'message': 'not found'
        });
      } else if (crypto.createHash('sha1').update(req.body.password).digest('hex') === user.password) {
        res.json(user);
      } else {
        res.json({
          'code': 102,
          'message': 'bad password'
        });
      }
    }
  });
});


///new list, get list of lists
app.post('/users/:id/lists', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      var list = {
        'numbers': [],
        'name': req.body.name,
        'lastSent': '',
        'id': +new Date() + ''
      };
      UserModel.update({'_id': user._id}, {'$push': {'distributionLists': list}}, function (err) { //, numAffected, raw) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          user.distributionLists.push(list);
          res.json(user);
        }
      });
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});
app.get('/users/:id/lists', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      res.json(user.distributionLists);
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});

///get list by id
app.get('/users/:id/lists/:listId', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      var i = 0,
        listFound = false,
        index = 0;
      for (i = 0; i < user.distributionLists.length; i++) {
        if (user.distributionLists[i].id === req.params.listId) {
          listFound = true;
          index = i;
        }
      }
      if (listFound) {
        res.json(user.distributionLists[index]);
      } else {
        res.status(400);
        res.send('List not found');
      }
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});
///update list name
app.put('/users/:id/lists/:listId', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      var i = 0,
        listFound = false;
      for (i = 0; i < user.distributionLists.length; i++) {
        if (user.distributionLists[i].id === req.params.listId) { // match! now delete it
          // res.json(user.distributionLists[i]);
          user.distributionLists[i].name = req.body.name;
          listFound = true;
        }
      }
      if (listFound) {
        UserModel.update({'_id': user._id}, {'$set': {'distributionLists': user.distributionLists}}, function (err) { //, numAffected, raw) {
          if (err) {
            res.status(500);
            res.send(err);
          } else {
            res.json(req.body.name);
          }
        });
      } else {
        res.status(400);
        res.send("List not found");
      }
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});
///delete list
app.delete('/users/:id/lists/:listId', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      var i = 0,
        listFound = false;
      for (i = 0; i < user.distributionLists.length; i++) {
        if (user.distributionLists[i].id === req.params.listId) { // match! now delete it
          // res.json(user.distributionLists[i]);
          user.distributionLists.splice(i, 1);
          listFound = true;
        }
      }
      if (listFound) {
        UserModel.update({'_id': user._id}, {'$set': {'distributionLists': user.distributionLists}}, function (err) { //, numAffected, raw) {
          if (err) {
            res.status(500);
            res.send(err);
          } else {
            res.json(user.distributionLists);
          }
        });
      } else {
        res.status(400);
        res.send("List not found");
      }
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});

///add/remove numbers on list
app.post('/users/:id/lists/:listId/:number', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      var i = 0,
        index = 0,
        listFound = false;
      for (i = 0; i < user.distributionLists.length; i++) {
        if (user.distributionLists[i].id === req.params.listId) { // match!
          user.distributionLists[i].numbers.push(req.params.number);
          listFound = true;
          index = i;
        }
      }
      if (listFound) {
        UserModel.update({'_id': user._id}, {'$set': {'distributionLists': user.distributionLists}}, function (err) { //, numAffected, raw) {
          if (err) {
            res.status(500);
            res.send(err);
          } else {
            res.json(user.distributionLists[index]);
          }
        });
      } else {
        res.status(400);
        res.send("List not found");
      }
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});
app.delete('/users/:id/lists/:listId/:number', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      var i = 0,
        j = 0,
        index = 0,
        listFound = false;
      for (i = 0; i < user.distributionLists.length; i++) {
        if (user.distributionLists[i].id === req.params.listId) { // match! now find the number
          index = i;
          for (j = 0; j < user.distributionLists[i].numbers.length; j++) {
            if (user.distributionLists[i].numbers[j] === req.params.number) {
              listFound = true;
              user.distributionLists[i].numbers.splice(j, 1);
            }
          }
        }
      }
      if (listFound) {
        UserModel.update({'_id': user._id}, {'$set': {'distributionLists': user.distributionLists}}, function (err) { //, numAffected, raw) {
          if (err) {
            res.status(500);
            res.send(err);
          } else {
            res.json(user.distributionLists[index]);
          }
        });
      } else {
        res.status(400);
        res.send("Number not found");
      }
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});

/// see list of past messages
app.get('/users/:id/history', function (req, res) {
  UserModel.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      res.status(500);
      res.send(err);
    } else if (user) {
      res.json(user.pastMessages);
    } else {
      res.status(400);
      res.json({
        'error': 'User not found'
      });
    }
  });
});

app.post('/sendMessage', function (req, res) {
  // req.body.list
  // req.body.userId
  // req.body.message
  var total = req.body.list.numbers.length,
    count = 0,
    i = 0,
    twilioDone = function () {
      if (count === total) {
        console.log(count + ' messages processed');
        UserModel.findOne({'_id': req.body.userId}, function (err, user) {
          if (err) {
            res.status(500);
            res.send(err);
          } else if (user) {
            // UserModel.update({'_id': user._id}, {'$push': {'distributionLists': list}}, function (err) { //, numAffected, raw) {
            var timestamp = +new Date(),
              message = {
                'list': req.body.list.name,
                'timestamp': timestamp,
                'content': req.body.message
              },
              j = 0;
            for (j = 0; j < user.distributionLists.length; j++) {
              if (user.distributionLists[j].id === req.body.list.id) {
                user.distributionLists[j].lastSent = timestamp;
              }
            }
            UserModel.update({'_id': req.body.userId}, {'$push': {'pastMessages': message}, '$set': {'distributionLists': user.distributionLists}}, function (err) {
              if (err) {
                res.status(500);
                res.send(err);
              } else {
                user.pastMessages.push(message);
                res.json(user);
              }
            });
          } else {
            res.status(400);
            res.json({
              'error': 'User not found'
            });
          }
        });
      }
    };
  for (i = 0; i < total; i++) {
    twilio.messages.create({
      to: req.body.list.numbers[i],
      from: config.twilio.from,
      body: req.body.message
    }, function (err, msg) {
      console.log(err, msg);
      count++;
      twilioDone();
    });
  }
});


app.listen(process.env.PORT || 5000, function () {
  console.log('listening');
});
