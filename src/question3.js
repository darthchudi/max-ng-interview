//CORRECTION: We need to put express in quotes, which is the way to reference and load modules in node via CommonJS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

//CORRECTION: You need to require dotenv to use process.env (Environment variables)
require('dotenv').config();

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

const mongoDB = process.env.MONGO_URI;

const app = express();

//As of Mongoose 5.x the MongoClient option is no longer necessary so we can remove it from the mongoose.connect line below
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(bodyParser.json());

// handler to save user

//CORRECTION: The arguments for the route handler should be in the order (req, res)
app.get('/save', function(req, res) {

  //CORRECTION: the user variable which was previously passed as an argument to the User model instance is not defined, a solution would be intializing an object variable e.g 'newUser' and passing it as an argument as seen below
  var newUser = {
    name: 'Chukwudi Oranu',
    email: 'chukwudioranu@ymail.com',
    password: 'eba'
  };

  const user = new User(newUser);

  user.save(function(err) {
    if (err) {
      logger.log(err);
      res.status(500).send(err);
    }

    //if there are no errors return success with a 200 HTTP status
    res.status(200).send('success');
  });


  //CORRECTION: Comment out or delete the line below because we cannot return another response once headers are sent [response was sent already in line 49 so the line below isn't needed]. Alternatively we could swap it with the response in line 49 if we want to return the newly created user
  // return res.json(user);
});

const server = http.createServer(app);

server.listen(80, function() {
  db.on('error', function(error) {
    logger.log(error);
  });
});
