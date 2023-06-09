const express = require('express');
const path = require('path');
const multer = require('multer');
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
const upload = multer({ dest: "public/repo/" });

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

        const sqlUser = `SELECT id FROM usuario WHERE id = ${req.query.id}`;

        conn.query(sqlUser, (err,result) => {
            if(err){
                let respuestaServidor = {
                    codigo: 500,
                    error: err,
                    mensaje: "no se tiene datos"
                }
                res.send(respuestaServidor);
            }else{
                let Iduser = result[0].id

                conn.query(`SELECT U.nombreUser, U.correo, U.pass as 'usuario', P.titulo, P.url, P.tagurl, P.contenido, P.proyecto, P.cliente, P.impresion, P.portafoliocol as 'portafolio', I.nombreImg, I.rutaImg, I.base64 as 'imagenes' FROM usuario U JOIN portafolio P JOIN imagenes I ON U.id = ${Iduser}`, (err, result) =>{
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
                            mensaje: result,
                            usuarioApp: Iduser

                        }
                        //res.send(respuestaServidor);
                        res.render('admin/pages/operativo',{
                            data: respuestaServidor.mensaje,
                            user: respuestaServidor.usuarioApp
                        });
                    }
                })
            }
        })
    })

});

app.post('/ingresarportafolio', urlencodedParser, (req, res) =>{
    let post = {
        idportafolio: req.body.idportafolio,
        titulo: req.body.titulo,
        url: req.body.url,
        tagurl: req.body.tagurl,
        proyecto: req.body.proyecto,
        cliente: req.body.cliente,
        impresion: req.body.impresion,
        contenido: req.body.contenido,
    }

    console.log(post);

    // conn.getConnection(() =>{
    //     conn.query("INSERT INTO portafolio(id_portafolio, titulo, url, tagurl, contenido, proyecto, cliente, impresion) VALUES ('"+post.idportafolio+"','"+post.titulo+"','"+post.url+"','"+post.tagurl+"','"+post.contenido+"','"+post.proyecto+"','"+post.cliente+"','"+post.impresion+"')",(err, result) =>{
    //         if(err){
    //             let respuestaServidor = {
    //                 codigo: 500,
    //                 error: err,
    //                 mensaje: "registro no creado "
    //             }
    //             res.send(respuestaServidor);
    //         }else{
    //             let respuestaServidor = {
    //                 codigo: 200,
    //                 error: false,
    //                 mensaje: "registro creado",
    //                 dato: post,
    //                 resultado: result
    //             }
    //             res.send(respuestaServidor);
    //         }
    //     })
    // })
});

app.post('/carga', upload.array('img', 8), async (req, res) => {
    try { 
      const img = req.files
        
      // verificar
      if (!img) {
        res.status(400).send({
          status: false,
          data: 'no se cargo nada'
        })
      } else {
        let data = []
        console.log(img[0].originalname);
        // recorrer img
        img.map(p =>
            data.push({
                name: p.originalname,
                mimetype: p.mimetype,
                size: p.size
            })
        )
  
        // respuesta de envio
        res.send({
          status: true,
          message: 'carga completa',
          data: data
        })
        // console.log(data[0]);
        // console.log(data[1]);
        // console.log(data[2]);
        // console.log(data[3]);
        // console.log(data[4]);
        // console.log(data[5]);
        // console.log(data[6]);
        // console.log(data[7]);
      }
    } catch (err) {
      res.status(500).send(err)
    }
  })


//corre el servidor
app.listen(PORT, () => {
    console.log(`se conecto al: http://localhost:${PORT}`);
})
