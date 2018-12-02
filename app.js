const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const User = require('./models/user-model');
const user = require('./user');
const post = require('./post');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', user);
app.use('/posts', post);


mongoose.Promise = bluebird;
mongoose.connect('mongodb://mongo:27017/warehouse', { useNewUrlParser: true });

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Somthing broke!');
});

app.listen(3001, () => {
	console.log('Server listen on port 3001');
});
