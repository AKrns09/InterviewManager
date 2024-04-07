var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details")

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
    var candidates = connection.query('select * from candidates where candidate_id = ?', [query]);
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

router.post("/add", function(req, res, next) {
  var candidate_name = req.body.candidate_name
  var cv_score = req.body.cv_score
  var interviewer = req.body.interviewer
  var connection = new MySql({
    user: 'root',
    password: 'ryte11/seRt62',
    host: connection_details.host,
    database: connection_details.database
  });
  connection.query("INSERT INTO candidates(candidate_name, cv_score, interviewer) VALUES ((?), (?), (?));", [candidate_name, cv_score, interviewer]);
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
