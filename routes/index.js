var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details")
var { validator, body } = require('express-validator');
var crypto = require('crypto');
var secretKey = 'my-secret-key';

router.get('/', function(req, res, next) {
  var connection = new MySql({
    user: connection_details.user,
    password: connection_details.password,
    host: connection_details.host,
    database: connection_details.database
  })
  var candidates = connection.query("select * from candidates;");
  res.render('index', { title: 'interview candidates', candidates:candidates, page_header: '', link: '' });
});

router.get('/search', function(req, res, next) {
    var connection = new MySql({
      user: 'root',
      password: 'ryte11/seRt62',
      host: connection_details.host,
      database: connection_details.database
    })
    var query = req.query.query
    query = "%" + query  + "%"
    var candidates = connection.query('select * from candidates where candidate_id like (?);', [query]);
    res.render('index', {title: 'Search Results', candidates: candidates, page_header: 'Search Results', link: '/', link_name: "Searched candidate"})
});

router.get('/add', function(req, res, next){
  var connection = new MySql({
    user: 'root',
    password: 'ryte11/seRt62',
    host: connection_details.host,
    database: connection_details.database
  });
  var candidates = connection.query('select * from candidates;')
  res.render('add_candidate', { candidates: candidates} )
});

router.post("/add", body('candidate_name').escape(), body('cv_score').escape(), body('interviewer').escape(), function(req, res, next) {
  var candidate_name = req.body.candidate_name
  var cv_score = req.body.cv_score
  var interviewer = req.body.interviewer
  //Reference: https://bootcamp.uxdesign.cc/understanding-hashing-encoding-and-encryption-in-express-js-2fec834a7d9e
  var cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted_cv_score = cipher.update(cv_score, 'utf-8', 'hex');
  encrypted_cv_score += cipher.final('hex');
  var connection = new MySql({
    user: 'root',
    password: 'ryte11/seRt62',
    host: connection_details.host,
    database: connection_details.database
  });
  connection.query("INSERT INTO candidates(candidate_name, cv_score, interviewer) VALUES ((?), (?), (?));", [candidate_name, encrypted_cv_score, interviewer]);
  console.log(req.body)
  res.redirect("/")
})

router.get('/delete', function(req, res, next) {
  var candidate_id = req.query.candidate_id
  var connection = new MySql({
    user: connection_details.user,
    password: connection_details.password,
    host: connection_details.host,
    database: connection_details.database
  });
  connection.query("DELETE FROM candidates where candidate_id = (?);", [candidate_id])
  res.redirect("/")
})

module.exports = router;
