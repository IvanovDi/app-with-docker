const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello world!');
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
