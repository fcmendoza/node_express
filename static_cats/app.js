var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs');

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));
app.use(cookieParser());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // mysqlserver.cmnemrz1mbor.us-west-1.rds.amazonaws.com
  user     : 'root',
  password : 'password',
  database : 'cats_db'
});

connection.connect();

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/about', function(req, res) {
  res.render('pages/about')
});

app.get('/class', function(req, res) {
  res.render('pages/class', {
    data: [
      {id: 1, name: "rob"},
      {id: 2, name: "jon"},
      {id: 3, name: "mat"},
    ],
    classroom: 507
  });
});

app.get('/animals', function(req, res) {
  connection.query('SELECT * FROM cats', function (error, results, fields) {
    if (error) res.send(error)
    else res.render('pages/animals', { data: results });
  });
});

app.get('/hey', function(req, res){
  res.send('hey');
});

app.get('/set/:name', function(req, res){
  req.session.na = req.params.name;
  res.send('hey ' + req.session.na);
});

app.get('/get-name', function(req, res){
  res.send('Session value: ' + req.session.na)
});

app.get('/apage', function(req, res){
  res.send(req.session.na + "!!!")
});

app.get('/logout', function(req, res){
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

app.get('/cats', function(req, res){
	connection.query('SELECT * FROM cats', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

app.get('/cats-insert', function(req, res){
  connection.query('insert into cats (cat_name) values (?)', [req.query.cat_name], function (error, results, fields) {
    if (error) res.send(error)
    else res.json({
      message: "success"
    });
  });
});

app.post('/cat', function(req, res){
  connection.query('insert into cats (cat_name) values (?)', [req.body.cat_name], function (error, results, fields) {
    if (error) res.send(error)
    // else res.json({
    //   message: "success"
    // });
    else res.redirect('/');
  });
});

app.get('/cats-delete', function(req, res){
  connection.query("delete from cats where id=(?)", [req.query.cat_id], function (error, results, fields) {
    if (error) res.send(error);
    else res.redirect('/'); // sends to the home route.
  });
});

// Default route when none of the above is hit.
// If the user hits a route that doesn't thn redirect them to the home page.
app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(3001, function(){
	console.log('listening on 3001');
});
