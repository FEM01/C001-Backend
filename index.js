var express = require('express')
var app = express()
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("dt001.db");
db.run("CREATE TABLE IF NOT EXISTS A001(datainput TEXT)");

var cors = require('cors')
app.use(cors())

const bpar = require('body-parser')
app.use(bpar.urlencoded({extended:true}))

app.get('/', function (req, res) {
	res.send(
		`<html>
			<body>
				<form action="/todo" method="post">
					<input name="input001"/>
					<button>Add</button>
				</form>
			</body>
		</html>`
	)
	// db.serialize(function () {
	// 	db.all("SELECT datainput from A001", function (err, tables) {
	// 		console.log(tables);
	// 	});
	// });
})

//insert
app.post('/todo', function (req, res) {
	const inputdata = req.body.input001
	res.send(db.run("INSERT INTO A001(datainput) VALUES(?)", [inputdata], function(err){
		if (err) {
			return console.log(err.message);
		}
		console.log(`Success`);
	}))
	res.end()
})

//Print
app.get('/todo', function (req, res) {
	// res.send(db.each("SELECT datainput from A001", function (err, result) {
    //         console.log(result)
    //     }))
	var dt = ""
	db.serialize(function () {
		db.all("SELECT rowid as Id, datainput as Decs FROM A001", function (err, tables) {
			console.log(tables);
			res.json(tables)
			res.end()
		});
	});
})


app.listen(3000)