const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const User = require('./models/user-model');
const user = require('./user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', user);


mongoose.Promise = bluebird;
mongoose.connect('mongodb://mongo:27017/warehouse', { useNewUrlParser: true });

app.get('/', async (req, res) => {
	const user = await User.findOne({ age: 24 });
	res.send(user);
});

app.all('/secret', (req, res, next) => {
	console.log('this is middelware for all requests!!!');
	next();
});

app.get('/main', (req, res) => {
    res.send('this is new application route!');
});

app.get('/secret', (req, res) => {
	res.send('this is secret');
});

app.post('/secret', (req, res) => {
	res.send('hello world!');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Somthing broke!');
});

app.listen(3001, () => {
	console.log('Server listen on port 3001');
});
