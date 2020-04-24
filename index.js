// Use path module
const path = require('path');
// Use express module
const express = require('express');
// Use hbs view engine
const hbs = require('hbs');
// Use bodyParser middleware
const bodyParser = require('body-parser');
// Use mysql database
const mysql = require('mysql');
//
const app = express();

// Create connection
const conn = mysql.createConnection ({
	host 	: 'localhost',
	user 	: 'root',
	password: 'akudankamu09',
	database: 'bendi_car'
});

// Connect to database
conn.connect ((err) => {
	if (err) throw err;
	console.log('Mysql connected..');
});

// Set view file
app.set('views', path.join(__dirname, 'views'));
// Set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// Set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

// Route for dashboard
app.get('/', (req, res) => {
	res.render('dashboard');
});

app.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

// Route for peminjaman
app.get('/peminjaman', (req, res) => {
	let sql = "SELECT * FROM peminjaman";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.render('peminjaman', {
			results: results
		});
	});
});

// Route for pengembalian
app.get('/pengembalian', (req, res) => {
	let sql = "SELECT * FROM pengembalian";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.render('pengembalian', {
			results: results
		});
	});
});

// Route for penyewa
app.get('/penyewa', (req, res) => {
	let sql = "SELECT * FROM penyewa";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.render('penyewa', {
			results: results
		});
	});
});

// Route for kendaraan
app.get('/kendaraan', (req, res) => {
	let sql = "SELECT * FROM kendaraan";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.render('kendaraan', {
			results: results
		});
	});
});

// Route for denda
app.get('/denda', (req, res) => {
	let sql = "SELECT * FROM denda";
	let query = conn.query(sql, (err, results) => {
		res.render('denda', {
			results: results
		});
	});
});

// Route for petugas
app.get('/petugas', (req, res) => {
	let sql = "SELECT * FROM petugas";
	let query = conn.query(sql, (err, results) => {
		res.render('petugas', {
			results: results
		});
	});
});

// Route for insert data petugas
app.post('/save', (req, res) => {
	let data = {id_petugas: req.body.id_petugas, nama: req.body.nama, email: req.body.email, password: req.body.password, jk: req.body.jk, jabatan: req.body.jabatan, gaji: req.body.gaji};
	let sql  = "INSERT INTO petugas SET ?";
	let query = conn.query(sql, data, (err, results) => {
		if (err) throw err;
		res.redirect('/petugas');
	});
});

// Route for update data
app.post('/update', (req, res) => {
	let sql = "UPDATE petugas SET nama='"+req.body.nama+"', email='"+req.body.email+"', password='"+req.body.password+"', jk='"+req.body.jk+"', jabatan='"+req.body.jabatan+"', gaji='"+req.body.gaji+"' WHERE id_petugas="+req.body.id;
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.redirect('/petugas');
	});
});

// Router for delete data
app.post('/delete', (req, res) => {
	let sql = "DELETE FROM petugas WHERE id_petugas="+req.body.id_petugas+" ";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.redirect('/petugas');
	});
});

// Route for about
app.get('/about', (req, res) => {
	res.render('about');
})

// Server listening
app.listen(8000, () => {
	console.log('Server is running at port 8000');
});