$(document).ready(function(){

    const urlPost2 = "http://localhost:5000/ingresarportafolio?";

    const idportafolio = document.getElementById("idportafolio");
    const titulo = document.getElementById("titulo");
    const url = document.getElementById("url");
    const tagurl = document.getElementById("tagurl");
    const proyecto = document.getElementById("proyecto");
    const cliente = document.getElementById("cliente");
    const impresion = document.getElementById("impresion");
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");
    const img5 = document.getElementById("img5");
    const img6 = document.getElementById("img6");
    const contenido = document.getElementById("contenido");
    //bton enviar
    const btnEnviar = document.getElementById("cargar");


    const envioDatos = () =>{
        axios.post(urlPost2, {
            idportafolio: idportafolio.value,
            titulo: titulo.value,
            url: url.value,
            tagurl: tagurl.value,
            proyecto: proyecto.value,
            cliente: cliente.value,
            impresion: impresion.value,
            img1: img1.value,
            img2: img2.value,
            img3: img3.value,
            img4: img4.value,
            img5: img5.value,
            img6: img6.value,
            contenido: contenido.value
        })
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    //init
    btnEnviar.addEventListener('click', function(event){
        event.preventDefault();
        envioDatos();
    });


    const form = document.getElementById("form");

    form.addEventListener("submit", submitForm);

    function submitForm(e) {
        e.preventDefault();
        const name = document.getElementById("name");
        const files = document.getElementById("files");
        const formData = new FormData();
        formData.append("name", name.value);
        for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
            //console.log(files.files[i]);
        }
        // axios.post("http://localhost:5000/upload_files", {
        //     body:formData
        // })
        // .then(function(response){
        //     console.log(response);
        // })
        // .catch(function(error){
        //     console.log(error);
        // });

        axios.post('/upload_files?', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          .then(function (response) {
            console.log(response);
          });

        // fetch("http://localhost:5000/upload_files", {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //     "Content-Type": "multipart/form-data"
        //     }
        // })
        //     .then((res) => console.log(res))
        //     .catch((err) => ("Error occured", err));
    }

});