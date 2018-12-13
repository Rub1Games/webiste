const package = require('./package.json');
const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const port = 8080; // eslint-disable-line

// Load interviews
let nomes = fs.readdirSync('src/entrevistas');
let entrevistas = [];
for(const nome of nomes) {
    if(nome.split('.')[1] == 'json')
        entrevistas.push({name: nome.replace('.json', ''), content: require('./src/entrevistas/'+nome)});
}

function GetEntrevista(entrevista) {
    for(let e of entrevistas) {
        if(e.name === entrevista)
            return e.content;
    }

    return false;
}

app.use(express.static(`${__dirname}/src`));
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('home', { entrevistas });
});

app.get('/entrevista/:entrevista', (req, res) => {
    let entrevista = GetEntrevista(req.params.entrevista);
    if(entrevista === false)
        return res.status(400).json({message: '400 Bad Request'});
    else
        return res.render('entrevista', { data: entrevista, entrevistas });
});

app.get('/github', (req, res) => {
    return res.redirect(package.homepage)
})

app.use((req, res) => {
    return res.status(404).json({message: '404 Not Found', coolthing: 'opa opa campeao'});
});

http.listen(port, () => {
    console.log(`ok ${port}`);
});
