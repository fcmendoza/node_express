var mysql = require("mysql");
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var bcrypt = require('bcryptjs');

app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365 }}));
app.use(cookieParser());

console.log(process.argv);

if (process.argv[2] == process.argv[3]) 
	console.log('The 2 params are equal.');
else 
	console.log('The 2 params are different.');

fs.writeFile('mynewfile1.txt', process.argv[0] + '\n', function (err) {
	if (err) console.log(err);
	console.log('The file was saved!');
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "another_users_db"
}); 

app.get('/', function(req, res){
	res.send('hi\n');
});

// http://localhost:3000/users/1
app.get('/users/:id', function(req, res){
	connection.query('SELECT * FROM users WHERE id = ?', [req.params.id],function (error, results, fields) {
	  if (error) throw error;
	  res.json(results[0]);
	});
});

// http://localhost:3000/signup/p@yahoo.com/super100
app.get('/signup/:email/:password', function(req, res){
	bcrypt.genSalt(10, function(err, salt) {
	    // res.send(salt);
	    bcrypt.hash(req.params.password, salt, function(err, p_hash) { 
	    	// res.send(p_hash);
	    	connection.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [req.params.email, p_hash], function (error, results, fields) {
	    	  var what_user_sees = "";
	    	  if (error) {
				  console.log(error);
	    	  	what_user_sees = 'you need to use a unique email';
	    	  } else {
	    	  	what_user_sees = 'you have signed up - please go login at the login route';
	    	  }
	    	  res.send(what_user_sees + '\n');
	    	});
	    });
	});
});

// http://localhost:3000/login/p@yahoo.com/super100
app.get('/login/:email/:password', function(req, res) {
	connection.query('SELECT * FROM users WHERE email = ?', [req.params.email], function (error, results, fields) {
		if (error) throw error; 

		if (results.length == 0){
			res.send('No results for that email. Please try again.\n');
		} 
		else {
			bcrypt.compare(req.params.password, results[0].password_hash, function(err, result) {
				if (result == true) {
					console.log('Password is correct.');
					req.session.user_id = results[0].id;
					req.session.email = results[0].email;
					res.send('you are logged in\n');
				} else {
					console.log('Password does not match. Redirecting to home.');
					res.redirect('/');
				}
			});
		}
	});
});

app.get('/another-page', function(req, res) {
	console.log(req.session);
	if (req.session && req.session.user_id) {
		var userinfo = {
			user_id : req.session.user_id,
			email: req.session.email
		}
		console.log(req.session.user_id);
		res.json(userinfo);
	}
	else {
		res.send('The session doesnt exist');
	}
});

app.get('/logout', function(req, res){
	req.session.destroy(function(err) {
		res.redirect('/')
	})
});

app.listen(3000, function(){
	console.log('listening on 3000');
});
