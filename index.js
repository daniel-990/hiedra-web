const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');

//mysql
const conn = require('./database/db.js');

//puerto
const puerto = config.get('servidor.puerto');
const PORT = process.env.PORT || puerto

//app
const app = express();
//utilidades
app.set('view engine', 'ejs');
app.use(express.static('public'));

const urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(bodyParser.json()) // salida json
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
    res.render('pages/index');
})




//corre el servidor
app.listen(PORT, () => {
    console.log(`se conecto al: http://localhost:${PORT}`);
})
