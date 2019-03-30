var express = require('express')
var path = require('path')
var app = express()

// var partners = [{
//     name: 'Jon',
//     favoriteHotBeverage: 'Chocolate',
//     favoriteColdBeverage: 'Soda',
//     likeChickpeas: true,
//     lastTimePlayedTag: 1
//   }, {
//     name: 'Jimmy',
//     favoriteHotBeverage: 'Tea',
//     favoriteColdBeverage: 'Beer',
//     likeChickpeas: true,
//     lastTimePlayedTag: 2
//   }, {
//     name: 'Mike',
//     favoriteHotBeverage: 'Chai',
//     favoriteColdBeverage: 'Orange Juice',
//     likeChickpeas: true,
//     lastTimePlayedTag: 10
//   },
// ];

// // app.get('/0', function (req, res) {
// //   res.json(partners[0])
// // })

// // app.get('/1', function (req, res) {
// //   res.json(partners[1])
// // })

// app.get('/:id', function (req, res) {
//   res.json(partners[req.params.id])
// })

// app.get('/students/:name/:project', function (req, res) {
//   res.json({
//     n: req.params.name,
//     p: req.params.project
//   })
// })
  
// app.get('/', function (req, res) {
//   res.json({
//     urls: ['http://localhost:3001/0', 'http://localhost:3001/1', 'http://localhost:3001/2']
//   })
// })

// // app.get('/', function (req, res) {
// //   res.send('0 1 2')
// // })

// /*
// make an express app that makes the following work IN ONE ROUTE
// /add/1/2
//     should send back 3
// /multiply/3/5
//     should send back 15
// /divide/10/2
//     should send back 5
// /subtract/100/3
//     should send back 97
// */

// app.get('/:operation/:a/:b', function (req, res) {
//   var result = 0;
//   var a = parseInt(req.params.a);
//   var b = parseInt(req.params.b);

//   switch (req.params.operation) {
//     case "add":
//       result = a + b;
//       break;
//     case "multiply":
//       result = a * b;
//       break;
//     case "divide":
//       result = a / b;
//       break;
//     case "subtract":
//       result = a - b;
//       break;
//   }

//   res.json({
//     result: result
//   })
// })

app.get('/movies', function (req, res) {
  res.json(req.query);
});

app.get('/sandy', function (req, res) {
  res.sendFile(path.join(__dirname, "sandy.html")); // ~/projects/test_node/sandy.html
});

app.get('/__dirname', function (req, res) {
  console.log('The __dirname is ', __dirname)
  res.send(__dirname+'\n');
});
 
app.get('/polar-bear', function (req, res) {
  res.json({
      animal: 'polar polar',
      weigth: '450 kg',
      length: '2.4 - 3 m',
      height: '1.3 m'
  })
})

app.get('/brown-bear', function (req, res) {
    res.json({
        animal: 'brown bear',
        weigth: '80 – 600 kg',
        length: '1.4 – 2.8 m',
        height: '70 – 150 cm'
    })
})

app.get('/gorilla', function (req, res) {
  res.json({
      animal: 'gorilla',
      weigth: '160 kg',
      length: '1.6 m',
      height: '1.6 – 1.7 m'
  })
})

app.get('/bison', function (req, res) {
  res.json({
      animal: 'bison',
      weigth: '460 – 990 kg',
      length: '4.6 m',
      height: '2.5 m'
  })
})
 
app.listen(3001, function() {
	console.log('listening on port ' + 3001)
})
