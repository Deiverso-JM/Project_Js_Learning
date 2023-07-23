//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Eventos
eventListeners();

function eventListeners() {
    //Cuando usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets) 

        agregarHTML();

    });
}

//Logica

function agregarTweet(e) {
    e.preventDefault();

    //Donde se escribe
    const tweet = document.querySelector("#tweet").value;


    //Validacion
    if ( tweet === "" ) {
        return mensajeError("Un mensaje no puede ir vacio");
    }

    const tweetObj = {
        id: Date.now(),
        tweet,

    }


    tweets = [...tweets, tweetObj]
    

    //Agregando los tweets

    agregarHTML();

    //Formulario
    formulario.reset();

}

//Mensaje de error

function mensajeError(mensaje) {
    const Error = document.createElement("p");
    Error.textContent = mensaje;
    Error.classList.add("error");

    //Dandole al contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(Error);

    //Eliminar el mensaje
    setTimeout(() => {
        Error.remove();
    }, 3000);
}



//Agregar HTML


function agregarHTML(){
    
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //Agregar botton elimanr
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X'
            
            //Añadir eliminar

            btnEliminar.onclick = () =>{
                borrrTweet(tweet.id);

            }
            //Agregar mensaje
            const li = document.createElement('li')
            li.textContent = `Mensaje: "${tweet.tweet}"`;
            const cite = document.createElement('cite');
            cite.textContent = `Fecha: ${tweet.id}`
            li.classList.add('tweet')
            cite.classList.add('tweet_cite')
            li.appendChild(btnEliminar)
            listaTweets.appendChild(li);
            li.appendChild(cite);

            
        })
    }


    sincronizarStorage();
}

//Agregar al local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets)) 
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }

}

//Eliminar

function borrrTweet(id){
    console.log('borrando')
    tweets = tweets.filter(tweet => tweet.id !== id)
    agregarHTML();
}

