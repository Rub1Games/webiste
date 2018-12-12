const package = require('./package.json');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 8080; // eslint-disable-line

app.use(express.static(`${__dirname}/src`));
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.get('/gitlab', (req, res) => {
    res.redirect(package.homepage)
})

app.use('/api', require('./api.js'));

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

http.listen(port, () => console.log(`ok ${port}`));
