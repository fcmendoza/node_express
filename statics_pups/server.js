var express = require('express');
var app = express();

/*
make a new express app that serves 3 images 
puppy-one.png
puppy-two.png
puppy-three.png
and serves a css file that makes the body have a background-color of blue
and serves an index.html file that displays all the images (and includes the css file)
*/

app.use(express.static("public"));

//you won't see this because it'll serve index.html because of app.use(express.static("public"));
app.get('/', function(req, res){
	res.send('blue sky');
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'tvshows_db'
});

connection.connect();

app.get('/tvshows', function(req, res){
	connection.query('SELECT * FROM tvshows', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

app.listen(3001, function(){
	console.log('listening on 3001');
});
