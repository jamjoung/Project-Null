var express = require('express');

const { pool } = require('./config');
const cors = require('cors');
var app = express();
var port = process.env.PORT || 8080;
var pgp = require('pg-promise')();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
var session = require('express-session');
var Pokedex = require('pokedex-promise-v2');
var options = {
	protocol: 'https',
	hostName: 'localhost:8080',
	versionPath: '/api/v2/',
	cacheLimit: 100 * 1000, // 100s
	timeout: 5 * 1000 // 5s
}
var P = new Pokedex(options);
var islogin = 'false';
var username = '';



const pokemonObj = class {
	constructor(hp, atk, def, spA, spD, speed, name, shiny, id, url) {
		this.hp = hp;
		this.atk = atk;
		this.def = def;
		this.spA = spA;
		this.spD = spD;
		this.speed = speed;
		this.name = name;
		this.shiny = shiny;
		this.id = id;
		this.url = url;
	}
	geturl() {
		return this.url;
	}
	isShiny() {
		return this.shiny;
	}
	getatk() {
		return this.atk;
	}
	getid() {
		return this.id;
	}
	getName() {
		return this.name;
	}
	getdef() {
		return this.def;
	}
	getspD() {
		return this.spD;
	}
	getspeed() {
		return this.speed;
	}
	getspA() {
		return this.spA;
	}
	gethp() {
		return this.hp;
	}
};

console.log(new pokemonObj(1, 2, 3, 4, 5, 6, 7, "tommy", 9).getName());









var jsdom = require("jsdom");
const { PreparedStatement } = require('pg-promise');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

let ssl = null;
if (process.env.NODE_ENV !== 'production') {
	ssl = { rejectUnauthorized: false };
}

const dbConfig = {
	host: 'ec2-3-228-114-251.compute-1.amazonaws.com',
	port: '5432',
	user: 'bymaxobtrjbrig',
	password: '14fc060cf577713b7b9fd68f374069fac34e98b7ed7336bf38168ff7fbd2f11d',
	database: 'd1945k2sqfb0rn',
	max: 20, // use up to 20 connections
	ssl: ssl
};
var db = pgp(dbConfig);

app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//SELECT * FROM pokemon;
app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/pokemon_images', express.static('pokemon_images'))




app.get('/', function (req, res) {

	if (islogin == "true") {
		res.render('ProjectNull', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			userid: '',
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('ProjectNull',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});

app.get('/ProjectNull', function (req, res) {
	currentTeam = new Array();
	if (islogin == "true") {
		res.render('ProjectNull', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('ProjectNull',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});

app.get('/db', async (req, res) => {
	currentTeam = new Array();
	var query = 'select * from pokemon;';
	//	var dataI ='';
	//	var url = "http://pokeapi.co/api/v2/pokemon";
	//	request(url, function(err, resp, body){
	//		if(!err && resp.statusCode == 200){
	//			dataI = JSON.parse(body);

	//	}
	//	})
	db.any(query)
		.then(function (rows) {
			res.render('db', {

				data: rows,
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
				//	im: dataI
			})
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('db', {
				data: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
				//	im: dataI
			})
		})
})

app.post('/db', async (req, res) => {
	//var counter = 0;
	//var imageURI = '';
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	var query = {
		// give the query a unique name
		name: 'fetch-user',
		text: 'SELECT * FROM pokemon WHERE pkmn_name LIKE $1',
		values: ['' + req.body.pkmName + '%'],
	}
	db.any(query)
		.then(function (rows) {
			//var count = 0;

			//	$.each(rows, function (i, myresult) {

			//	var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/"+ myresult.pokemon_id;
			//	$.getJSON(pokeURL2, function(json){ 
			//		imageURI[i] = json.sprites.front_default.toString();  } ) 
			//})


			res.render('db', {

				data: rows,
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
				//im: imageURI
			})
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('db', {
				data: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
				//im: imageURI
			})
		})
})
app.get('/HowtoPlay', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	if (islogin == "true") {
		res.render('HowtoPlay', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('HowtoPlay',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});

app.get('/whatAreShinys', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	if (islogin == "true") {
		res.render('whatAreShinys', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('whatAreShinys',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});
app.get('/typechart', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	if (islogin == "true") {
		res.render('typechart', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('typechart',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});
app.get('/abilities', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	if (islogin == "true") {
		res.render('abilities', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('abilities',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});
app.get('/items', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	if (islogin == "true") {
		res.render('items', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('items',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});
app.get('/compstrat', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];;
	if (islogin == "true") {
		res.render('compstrat', {

			data: '',
			choice: '',
			logged: req.session.usernameInput,
			islogged: req.session.loggedin
		})
	}
	else {
		res.render('compstrat',
			{
				data: '',
				choice: '',
				logged: req.session.usernameInput,
				islogged: req.session.loggedin
			});
	}
});
app.get('/signout', function (req, res) {
	currentTeam = ['1', '1', '1', '1', '1', '1'];
	req.session.usernameInput = '';
	req.session.loggedin = false;
	res.render('ProjectNull', {

		data: '',
		choice: '',
		logged: req.session.usernameInput,
		userid: '',
		islogged: req.session.loggedin
	})
});


app.get('/TeamBuilder', function (req, res) {
	var query = 'select * from pokemon;';
	var currentTeam = ['1', '1', '1', '1', '1', '1'];
	console.log(req.session.userID, "---------------------------------------------");
	var useridv = req.session.userID;
	db.any(query)
		.then(function (rows) {
			res.render('TeamBuilder', {

				data: rows,
				choice: '',
				savedmon: JSON.stringify(currentTeam),
				logged: req.session.usernameInput,
				teamC: '',
				userid: useridv,
				islogged: req.session.loggedin
			})
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('TeamBuilder', {
				data: '',
				choice: '',
				savedmon: '',
				logged: req.session.usernameInput,
				teamC: '',
				userid: '',
				islogged: req.session.loggedin
			})
		})

});

app.post('/TeamBuilder', (req, res) => {
	if (req.body.useridC != '') {
		var useridS = req.body.useridC;
	}
	else {
		var useridS = '';
	}
	console.log(useridS);
	var pC = req.body.partycount;
	if (pC > 0) {
		var currentTeam = JSON.parse(req.body.saved);

	}
	else {
		var currentTeam = ['1', '1', '1', '1', '1', '1'];;
	}
	var query = {
		// give the query a unique name
		text: 'SELECT * FROM pokemon WHERE LOWER(pkmn_name) LIKE $1',
		values: ['' + req.body.pkmName + '%'],
	}
	if (req.body.Generations != "0") {
		query.values[1] = req.body.Generations;
		query.text += 'and generation = $2';
	}
	if (req.body.type != "Any" && req.body.Generations == "0") {
		query.values[1] = req.body.type;
		query.text += 'and type_1 = $2';
	}
	else if (req.body.type != "Any") {
		query.values[2] = req.body.type;
		query.text += 'and type_1 = $3';
	}


	var generationsIn = req.body.Generations;
	var pkmNameIn = req.body.pkmName;
	if (pkmNameIn == '' && generationsIn == 'Any') {
		var qu = 'SELECT * FROM pokemon WHERE type_1=';
	}

	db.any(query)
		.then(function (rows) {
			res.render('TeamBuilder', {

				data: rows,
				choice: '',
				savedmon: JSON.stringify(currentTeam),
				logged: req.session.usernameInput,
				teamC: pC,
				userid: useridS,
				islogged: req.session.loggedin
			})
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('TeamBuilder', {
				data: '',
				choice: '',
				savedmon: '',
				logged: req.session.usernameInput,
				teamC: '',
				userid: useridS,
				islogged: req.session.loggedin
			})
		})
})
app.post('/TeamBuilder/selectmon', (req, res) => {
	if (req.body.useridC != '') {
		var useridS = req.body.useridC;
	}
	else {
		var useridS = '';
	}
	console.log(req.body.saved, "this here ere rere");
	var pC = req.body.partycount;
	if (pC > 0) {
		console.log(req.body.saved);
		var currentTeam = JSON.parse(req.body.saved);
	}
	else {
		var currentTeam = ['1', '1', '1', '1', '1', '1'];;
	}
	if (req.body.choice < 10) {
		var uurl = 'http://www.serebii.net/xy/pokemon/00' + req.body.choice + '.png';
	}
	else if (req.body.choice < 100) {
		var uurl = 'http://www.serebii.net/xy/pokemon/0' + req.body.choice + '.png';
	}
	else {
		var uurl = 'http://www.serebii.net/xy/pokemon/' + req.body.choice + '.png';
	}
	var query = {
		// give the query a unique name
		name: 'fetch-user',
		text: 'SELECT * FROM pokemon WHERE pokemon_id =$1',
		values: [req.body.choice],
	}

	db.any(query)
		.then(function (rows) {
			res.render('TeamBuilder', {

				choice: rows,
				data: '',
				savedmon: JSON.stringify(currentTeam),
				imgg: uurl,
				logged: req.session.usernameInput,
				teamC: pC,
				userid: useridS,
				islogged: req.session.loggedin
			})
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('TeamBuilder', {
				choice: '',
				data: '',
				savedmon: '',
				img: '',
				logged: req.session.usernameInput,
				teamC: '',
				userid: useridS,
				islogged: req.session.loggedin

			})
		})

});
app.post('/TeamBuilder/confirm', (req, res) => {
	if (req.body.useridC != '') {
		var useridS = req.body.useridC;
	}
	else {
		var useridS = '';
	}
	var query = 'SELECT * FROM pokemon';
	var pC = req.body.partycount;
	if (pC > 0) {
		var currentTeam = JSON.parse(req.body.saved);

	}
	else {
		var currentTeam = ['1', '1', '1', '1', '1', '1'];;
	}

	console.log(req.body.hp);
	console.log(req.body.atk);
	console.log(req.body.def);
	console.log(req.body.spD);
	console.log(req.body.spA);
	console.log(req.body.speed);
	console.log(req.body.name);
	console.log(req.body.noshin);
	console.log(req.body.id);
	if (currentTeam.length <= 6) {
		if (req.body.id < 10) {
			var uurl = 'http://www.serebii.net/xy/pokemon/00' + req.body.id + '.png';
		}
		else if (req.body.id < 100) {
			var uurl = 'http://www.serebii.net/xy/pokemon/0' + req.body.id + '.png';
		}
		else {
			var uurl = 'http://www.serebii.net/xy/pokemon/' + req.body.id + '.png';
		}
		console.log(uurl);
		var myObj;
		myObj = {
			"hp": req.body.hp,
			"atk": req.body.atk,
			"def": req.body.def,
			"spA": req.body.spA,
			"spD": req.body.spD,
			"speed": req.body.speed,
			"name": req.body.name,
			"shiny": req.body.noshin,
			"id": req.body.id,
			"url": uurl
		};


		currentTeam[pC] = myObj;
		pC++;
	}
	console.log('this is heregggggggggggggggggggggggggggggg', currentTeam[0]);
	db.any(query)
		.then(function (rows) {
			res.render('TeamBuilder', {

				choice: '',
				data: rows,
				savedmon: JSON.stringify(currentTeam),
				img: P,
				logged: '',
				teamC: pC,
				logged: req.session.usernameInput,
				userid: useridS,
				islogged: req.session.loggedin
			})
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('TeamBuilder', {
				choice: '',
				data: '',
				savedmon: '',
				logged: '',
				teamC: '',
				logged: req.session.usernameInput,
				userid: useridS,
				islogged: req.session.loggedin
			})
		})

});
app.get('/user-page', function (req, res) {

	var query =  'SELECT * FROM "teams" WHERE team_id IN (SELECT unnest(teams) FROM "Users" WHERE id = \'' + req.session.userID + '\' );'
	
	db.any(query)
		.then(function (rows) {
			res.render('user-page', {
				text_variable: "Profile",
				choice: '',
				data: rows,
				savedmon: '',
				teamC: req.session.teamCount,
				logged: req.session.usernameInput,
				islogged: req.session.loggedin,
				userid: req.session.userID,
				selected: '',
				teamnum:1
			});
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('TeamBuilder', {
				choice: '',
				data: '',
				savedmon: '',
				logged: '',
				teamC: req.session.teamCount,
				logged: req.session.usernameInput,
				userid: useridS,
				islogged: req.session.userID,
				selected: '',
				teamnum:1
			})
		})
});
app.post('/user-page/delete', function (req, res) {


		var useridS = req.session.userID;


		var insert_values =	' UPDATE \"teams\" SET team_id = \'' + 0 + '\' WHERE team_id = \'' + req.body.select + '\';';
		var tc = req.session.teamCount -1;
		req.session.teamCount = tc;
		insert_values += ' UPDATE \"Users\" SET teamcount = \'' + tc + '\' WHERE id = \'' + req.session.userID + '\';'
		console.log(insert_values);


		db.task('get-everything', task => {
			return task.batch([
				task.any(insert_values)
			]);
		})

			.then(info => {
				console.log("Done with task");
				res.render('ProjectNull', {
					// 	username: usernameInput,
					// 	email: emailInput,
					// 	password: passwordInput
					data: '',
					choice: '',
					logged: req.session.usernameInput,
					userid: useridS,
					islogged: req.session.loggedin
				})
			})

			.catch(err => {
				console.log('error', err);
				res.render(__dirname + '/views/login.ejs', {
					username: '',
					email: '',
					password: '',
					userid: useridS,
					islogged: req.session.loggedin
				})
			})


	
});
app.post('/user-page/select', function (req, res) {

	var query =  'SELECT * FROM "teams" WHERE team_id IN (SELECT unnest(teams) FROM "Users" WHERE id = \'' + req.session.userID + '\' );'
	var select1 = req.body.select;
	var teamnumi = req.body.cc;
	console.log(select1);
	db.any(query)
		.then(function (rows) {
			res.render('user-page', {
				text_variable: "Profile",
				choice: '',
				data: rows,
				savedmon: '',
				teamC: req.session.teamCount,
				selected: select1,
				logged: req.session.usernameInput,
				islogged: req.session.loggedin,
				userid: req.session.userID,
				teamnum:teamnumi
			});
		})
		.catch(function (err) {
			console.log('error', err);
			res.render('TeamBuilder', {
				choice: '',
				data: '',
				savedmon: '',
				logged: '',
				teamC: req.session.teamCount,
				logged: req.session.usernameInput,
				userid: useridS,
				islogged: req.session.userID,
				selected: select1,
				teamnum:teamnumi
			})
		})
});
app.post('/TeamBuilder/save', (req, res) => {
	if (req.body.useridC != '') {
		var useridS = req.body.useridC;
	}
	else {
		var useridS = '';
	}

	var pC = req.body.partycount;
	console.log('this is here', req.body.saved);
	if (pC > 0) {
		var currentTeam = JSON.parse(req.body.saved);
	}
	else {
		var currentTeam = ['1', '1', '1', '1', '1', '1'];
	}


	console.log('this is -----------------------------------', currentTeam[0]);
	var checkpokeDB = 'SELECT COUNT(pokename) FROM \"teams\";';
	db.any(checkpokeDB)
		.then(
			function (data) {
			
				var insert_values = 'INSERT INTO \"teams\"(attack_ev, defense_ev,hp_ev,pokeid,pokename,shiny,spattack_ev,spdefense_ev,speed_ev,team_id,username_id) \ VALUES';


				if (data == 0) {
					console.log(insert_values);
					for (var i = 0; i < pC - 1; i++) {
						insert_values += '(\'' + currentTeam[i].atk + '\',\'' + currentTeam[i].def + '\',\'' + currentTeam[i].hp + '\',\'' + currentTeam[i].id + '\',\'' + currentTeam[i].name + '\',\'' + currentTeam[i].shiny + '\',\'' + currentTeam[i].spA + '\',\'' + currentTeam[i].spD + '\',\'' + currentTeam[i].speed + '\',\'' + 0 + '\',\'' + 0 + '\'),'
					}
					insert_values += '(\'' + currentTeam[pC - 1].atk + '\',\'' + currentTeam[pC - 1].def + '\',\'' + currentTeam[pC - 1].hp + '\',\'' + currentTeam[pC - 1].id + '\',\'' + currentTeam[pC - 1].name + '\',\'' + currentTeam[pC - 1].shiny + '\',\'' + currentTeam[pC - 1].spA + '\',\'' + currentTeam[pC - 1].spD + '\',\'' + currentTeam[pC - 1].speed + '\',\'' + 0 + '\',\'' + 0 + '\');';

					console.log(insert_values);

					db.task('get-everything', task => {
						return task.batch([
							task.any(insert_values)
						]);
					})

						.then(info => {
							console.log("Done with task");
							res.render('ProjectNull', {
								// 	username: usernameInput,
								// 	email: emailInput,
								// 	password: passwordInput
								data: '',
								choice: '',
								logged: req.session.usernameInput,
								userid: useridS,
								islogged: req.session.loggedin
							})
						})

						.catch(err => {
							console.log('error', err);
							res.render(__dirname + '/views/login.ejs', {
								username: '',
								email: '',
								password: '',
								userid: useridS,
								islogged: req.session.loggedin
							})
						})


				} else {
					console.log(data);
					console.log(insert_values);
					var tc = req.session.teamCount + 1;
					req.session.teamCount = tc;
					for (var i = 0; i < pC - 1; i++) {
						insert_values += '(\'' + currentTeam[i].atk + '\',\'' + currentTeam[i].def + '\',\'' + currentTeam[i].hp + '\',\'' + currentTeam[i].id + '\',\'' + currentTeam[i].name + '\',\'' + currentTeam[i].shiny + '\',\'' + currentTeam[i].spA + '\',\'' + currentTeam[i].spD + '\',\'' + currentTeam[i].speed + '\',\'' + data[0].count + '\',\'' + 0 + '\'),'
					}
					insert_values += '(\'' + currentTeam[pC - 1].atk + '\',\'' + currentTeam[pC - 1].def + '\',\'' + currentTeam[pC - 1].hp + '\',\'' + currentTeam[pC - 1].id + '\',\'' + currentTeam[pC - 1].name + '\',\'' + currentTeam[pC - 1].shiny + '\',\'' + currentTeam[pC - 1].spA + '\',\'' + currentTeam[pC - 1].spD + '\',\'' + currentTeam[pC - 1].speed + '\',\'' + data[0].count + '\',\'' + 0 + '\');';
					insert_values += ' UPDATE \"Users\" SET teams[\'' + tc + '\'] = \'' + data[0].count + '\' WHERE id = \'' + req.session.userID + '\';';
					insert_values += ' UPDATE \"Users\" SET teamcount = \'' + tc + '\' WHERE id = \'' + req.session.userID + '\';'
					console.log(insert_values);
					db.task('get-everything', task => {
						return task.batch([
							task.any(insert_values)
						]);
					})

						.then(function() {
							console.log("Done with task");
							res.render('ProjectNull', {
								// 	username: usernameInput,
								// 	email: emailInput,
								// 	password: passwordInput
								data: '',
								choice: '',
								logged: req.session.usernameInput,
								userid: useridS,
								islogged: req.session.loggedin
							})
						})

						.catch(err => {
							console.log('error', err);
							res.render('ProjectNull', {
								username: '',
								email: '',
								password: '',
								userid: useridS,
								islogged: req.session.loggedin
							})
						})
				}
			}
		)
		.catch(e => console.log("ERROR - " + e));

});


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////LOGIN STUFF/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

app.get('/login', function (req, res) {
	res.render(__dirname + '/views/login.ejs', {
		text_variable: "Login"
	});
});

app.get('/registration', function (req, res) {
	res.render(__dirname + '/views/registration.ejs', {
		error: false,
		errorMsg: "",
		logged: '',
		islogged: req.session.loggedin
	});
});


app.post('/registration', function (req, res) {

	if (req.body.useridC != '') {
		var useridS = req.body.useridC;
	}
	else {
		var useridS = '';
	}

	var usernameInput = req.body.usernameInput.toLowerCase();
	var emailInput = req.body.emailInput;
	var passwordInput = req.body.passwordInput;
	var checkUserDB = 'SELECT username FROM \"Users\" WHERE username =\'' + usernameInput + '\';';
	db.any(checkUserDB)
		.then(
			function (data) {
				if (data.length > 0) {
					//USER EXISTS SEND ERROR
					console.log("User exists")
					userExists = 1
					res.render(__dirname + "/views/registration.ejs", {
						error: true,
						errorMsg: "User already exists"
					});


				} else {
					//USER DOES NOT EXIST GO AHEAD WITH REGISTRATION
					userExists = 0;

					console.log("usernameInput: " + req.body.usernameInput);
					console.log("emailInput: " + req.body.emailInput);
					console.log("passwordInput: " + req.body.passwordInput);
					var insert_values = 'INSERT INTO \"Users\"(username, email, password) \ VALUES(\'' + usernameInput + '\',\'' + emailInput + '\',\'' + passwordInput + '\');';

					db.task('get-everything', task => {
						return task.batch([
							task.any(insert_values)
						]);
					})
						.then(info => {
							console.log("Done with task");
							res.render(__dirname + '/views/login.ejs', {
								// 	username: usernameInput,
								// 	email: emailInput,
								// 	password: passwordInput
								data: '',
								choice: '',
								logged: req.session.usernameInput,
								userid: useridS,
								islogged: req.session.loggedin
							})
						})

						.catch(err => {
							console.log('error', err);
							res.render(__dirname + '/views/login.ejs', {
								username: '',
								email: '',
								password: '',
								userid: useridS,
								islogged: req.session.loggedin
							})
						})
				}
			}
		)
		.catch(e => console.log("ERROR - " + e));

});


app.post('/auth', function (req, res) {
	console.log("AUTH - User Authenticating")

	var usernameInput = req.body.username.toLowerCase();
	var passwordInput = req.body.password;
	if (req.body.useridC != '') {
		var useridS = req.body.useridC;
	}
	else {
		var useridS = '';
	}



	// var alert = 0;

	console.log(usernameInput);
	console.log(passwordInput);
	if (usernameInput && passwordInput) {
		console.log("AUTH - User and Pass Valid");
		var query = 'SELECT * FROM \"Users\" WHERE username =\'' + usernameInput + '\' AND password =\'' + passwordInput + '\';';
		db.any(query)
			.then(
				function (results) {
					if (results.length > 0) {
						console.log(JSON.stringify(results[0].id))
						islogin = "true";
						useridS = results[0].id;
						var sessData = req.session;
						username = usernameInput;
						req.session.loggedin = true;
						req.session.usernameInput = usernameInput;
						req.session.userID = results[0].id;
						req.session.teamCount = results[0].teamcount;
						console.log(results[0].teamcount)
						console.log("AUTH - FOUND USER");
						res.render('ProjectNull', {

							data: '',
							choice: '',
							logged: req.session.usernameInput,
							userid: useridS,
							islogged: req.session.loggedin
						})
					} else {
						res.send('Incorrect Username and/or Password!');
						// alert('Incorrect Username and/or Password!');
						// alert = 1;
						console.log("AUTH - Wrong username or password");
					}
					res.end();
				}
			)
			.catch(e => console.log("Incorrect Username and/or Password"));
	}
	else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

app.listen(port, function () {
	console.log('Our app is running on http://localhost:' + port);
});

