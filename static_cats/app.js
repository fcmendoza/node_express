/*
make a database called cats_db

make a table called cats
    the table should have an id and a place_name column

insert 4 records into the cats table

make an express app with a public folder that is static with an index.html file

make a route /cats

    that sends all the cats from the cats table as json

in the index.html file make an ajax call to the /cats route and make paragraph tags for each cat and put them in the body of the index.html file
*/

var express = require('express');
var app = express();

app.use(express.static("public"));

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'cats_db'
});

connection.connect();

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

app.get('/cats-delete', function(req, res){
  connection.query("delete from cats where id=(?)", [req.query.cat_id], function (error, results, fields) {
    if (error) res.send(error);
    else res.redirect('/'); // sends to the home route.
  });
});

app.listen(3001, function(){
	console.log('listening on 3001');
});
