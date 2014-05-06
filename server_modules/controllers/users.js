var Promise = require('bluebird');
var shell = require('./../shell_commands');
var bodyParser = require('body-parser');


//2MayAdrian
var bcrypt = require('bcrypt-nodejs');


var generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
var validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


exports.create = function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  var newUser = Promise.promisify(shell.createUser);
  newUser(req.body.username)
  .then(function() {
    console.log('created user ', req.body.username);

    collection.insert({
      username: req.body.username,
      meta: {},
      // email: '',
      // pwHash: '',

      //2MayAdrian
      email: req.body.email,
      pwHash: generateHash(req.body.password)
    });

    res.send(201);
  })
  .catch(function(err){
    res.send(400, err.toString());
  })
}

exports.delete = function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  var projCollection = db.get('projectcollection');

  shell.deleteUser(req.query.username)
  .then(function() {
    console.log('deleted user ', req.query.username);

    collection.remove({username: req.query.username});
    projCollection.remove({username: req.query.username});
    
    res.send(204);
  })
  .catch(function(err){
    console.log(err);
    res.send(400, err.toString());
  });
}

