const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => res.status(200).json({message: 'o JCARVALHO é fixe'}));

let nomes = fs.readdirSync('src/entrevistas');

let entrevistas = [];
for(const nome of nomes) {
    if(nome.split('.')[1] == 'json')
        entrevistas.push({name: nome.replace('.json', ''), content: require('./src/entrevistas/'+nome)});
}

router.get('/entrevistas', (req, res) => {
    return res.status(200).json(entrevistas);
})

router.get('/entrevista/:entrevista', (req, res) => {
    const entrevista = req.params.entrevista;

    for(let e of entrevistas) {
        if(e.name === entrevista)
            return res.status(200).json(e.content);
    }

    return res.status(400).json({message: '400 Bad Request'});
});

module.exports = router;
