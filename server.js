const package = require('./package.json');
const express = require('express');
const snekfetch = require('snekfetch');
const app = express();
const http = require('http').Server(app);
const port = 8080; // eslint-disable-line

app.use(express.static(`${__dirname}/src`));
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    let { body: entrevistas } = await snekfetch.get(`http://localhost:${port}/api/entrevistas`);

    res.render('home', { entrevistas });
});

app.get('/entrevista/:entrevista', async(req, res) => {
    let { body: data } = await snekfetch.get(`http://localhost:${port}/api/entrevista/${req.params.entrevista}`);
    let { body: entrevistas } = await snekfetch.get(`http://localhost:${port}/api/entrevistas`);
    

    res.render('entrevista', { data, entrevistas });
});

app.get('/gitlab', (req, res) => {
    res.redirect(package.homepage)
})

app.use('/api', require('./api.js'));

app.use((req, res) => {
    res.status(404).json({message: '404 Not Found', coolthing: 'opa opa campeao'});
});

http.listen(port, () => {
    console.log(`ok ${port}`);
});
