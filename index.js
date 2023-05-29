const express = require('express');
const path = require('path');
const multer = require("multer");
const bodyParser = require('body-parser');
const config = require('config');


//mysql
const conn = require('./database/db.js');
const { send } = require('process');

//puerto
const puerto = config.get('servidor.puerto');
const PORT = process.env.PORT || puerto

//app
const app = express();
//utilidades
app.set('view engine', 'ejs');
app.use(express.static('public'));

//subida de archivos
const upload = multer({ dest: "uploads/" });

const urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(bodyParser.json()) // salida json
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
    res.render('web/pages/index');
});

app.get('/portafolio', (req, res) => {

    conn.getConnection(() =>{
        conn.query(`SELECT id, titulo, url, tagurl, contenido, proyecto, cliente, impresion, img1, img2, img3, img4, img5, img6 FROM portafolio`, (err,result) => {
            if(err){
                let respuestaServidor = {
                    codigo: 500,
                    error: err,
                    mensaje: "no se tiene datos"
                }
                console.log(respuestaServidor);
                res.render('web/pages/portafolio',{
                    data: respuestaServidor.mensaje
                });
            }else{
                let respuestaServidor = {
                    codigo: 200,
                    error: false,
                    mensaje: result
                }
                //console.log(respuestaServidor.mensaje);
                res.render('web/pages/portafolio',{
                    data: respuestaServidor.mensaje
                });
            }
        })
    })

});

app.get('/info', (req, res) => {
    res.render('web/pages/info');
});

//admin
app.get('/admin', (req, res) => {

    conn.getConnection(() =>{
        conn.query("SELECT id, titulo, url, tagurl, contenido, proyecto, cliente, impresion, img1, img2, img3, img4, img5, img6 FROM portafolio", (err,result) => {
            if(err){
                let respuestaServidor = {
                    codigo: 500,
                    error: err,
                    mensaje: "no se tiene datos"
                }
                res.send(respuestaServidor);
            }else{
                let respuestaServidor = {
                    codigo: 200,
                    error: false,
                    mensaje: result
                }
                res.render('admin/pages/operativo',{
                    data: respuestaServidor.mensaje
                });
            }
        })
    })

});

app.post('/ingresarportafolio', urlencodedParser, (req, res) =>{
    /*  
        *para enviar parametros por url Query 
        //const urlPost1 = "http://localhost:5000/ingresarportafolio?titulo=prueba1&url=descripcionDeLaprueba1&tagurl=prueba1&proyecto=1200&cliente=100&impresion=uno&img1=1&img2=1&img3=1&img4=1&img5=1&img6=1&contenido=tres";
        let post = {
            titulo: req.query.titulo,
            url: req.query.url,
            tagurl: req.query.tagurl,
            proyecto: req.query.proyecto,
            cliente: req.query.cliente,
            impresion: req.query.impresion,
            img1: req.query.img1,
            img2: req.query.img2,
            img3: req.query.img3,
            img4: req.query.img4,
            img5: req.query.img5,
            img6: req.query.img6,
            contenido: req.query.contenido,
        }
    */

    //para enviar parametros desde un formulario
    let post = {
        titulo: req.body.titulo,
        url: req.body.url,
        tagurl: req.body.tagurl,
        proyecto: req.body.proyecto,
        cliente: req.body.cliente,
        impresion: req.body.impresion,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4,
        img5: req.body.img5,
        img6: req.body.img6,
        contenido: req.body.contenido,
    }

    conn.getConnection(() =>{
        conn.query("INSERT INTO portafolio(titulo, url, tagurl, contenido, proyecto, cliente, impresion, img1, img2, img3, img4, img5, img6) VALUES ('"+post.titulo+"','"+post.url+"','"+post.tagurl+"','"+post.contenido+"','"+post.proyecto+"','"+post.cliente+"','"+post.impresion+"','"+post.img1+"','"+post.img2+"','"+post.img3+"','"+post.img4+"','"+post.img5+"','"+post.img6+"')",(err, result) =>{
            if(err){
                let respuestaServidor = {
                    codigo: 500,
                    error: err,
                    mensaje: "registro no creado "
                }
                res.send(respuestaServidor);
            }else{
                let respuestaServidor = {
                    codigo: 200,
                    error: false,
                    mensaje: "registro creado",
                    dato: post,
                    resultado: result
                }
                res.send(respuestaServidor);
            }
        })
    })
});

app.post('/upload_files', upload.single('file'), (req, res) => {

    console.log(req.file);

    // if (req.file) {
    //   // Archivo cargado exitosamente
    //   res.json({ message: 'Archivo cargado correctamente.', filename: req.file.filename });
    //   console.log(req.file.filename);
    // } else {
    //   // No se proporcionó ningún archivo
    //   res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    //   console.log("no se logro cargar ningun archivo");
    // }
});


//corre el servidor
app.listen(PORT, () => {
    console.log(`se conecto al: http://localhost:${PORT}`);
})
