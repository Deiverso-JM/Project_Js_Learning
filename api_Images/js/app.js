const resultado = document.querySelector('#resultado'); 
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');


const registrosPorPagina = 30;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () =>{
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;


    if (terminoBusqueda === '') {
        mostrarAlerta("Debes escribir una palabra");
        return
        
    }

    burcasImagenes();

    
}


function mostrarAlerta(msg) {
    
    const existeAlerta = document.querySelector('.bg-red-100');
    if(!existeAlerta){
        const msgDiv = document.createElement('p');
        msgDiv.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-lg', 'mx-auto', 'mt-6', 'text-center')
        
        
        msgDiv.innerHTML = `
        <strong class="font-bold ">Error:</strong>
        <span class="block sm:inline">${msg}</span>
        `                    
        formulario.appendChild(msgDiv)               
        setTimeout(() => {
            msgDiv.remove()
        }, 3000);
    }
}

async function burcasImagenes() {
    const termino = document.querySelector('#termino').value;

    const key = '39613122-d6ea613aecbcb59f452a6e8de';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${totalPaginas}&page=${paginaActual}`;

    
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        totalPaginas = calcularPaginas(resultado.totalHits);
        mostrarImagenes(resultado.hits);
    } catch (error) {
        console.log(error)
    }
}  

//Generador que va a registrar la cantidad

function *crearPaginador(total){
    for (let i = 0; i < total; i++) {  
        yield i;
    }
}

function mostrarImagenes(imagenes) {
    console.log(imagenes)
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }


    //Iterar

    imagenes.forEach(imagen => {

        const {previewURL, likes, views, largeImageURL} = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}"> 

                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light">Me Gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Vistas   </span></p>

                        <a
                         class="w-full block bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                         href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                            Ver Imagen
                        </a>

                    </div>
                </div>
            </div> `

        

        
    });


    //Limpiar Paginador
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    imprimitPaginador(totalPaginas)

}

function imprimitPaginador() {
    iterador = crearPaginador(totalPaginas);
    console.log(iterador.next().value);

    while (true) {
        const {value, done} = iterador.next();
        if(done) return;
        //Caso contrario, genera un boton por cada elemento en el generador
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina =value;
        boton.textContent = value;

        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2','font-bold','mb-10','uppercase','rounded');

        boton.onclick = () =>{
            paginaActual =value;

            burcasImagenes(paginaActual)
        }
        paginacionDiv.appendChild(boton);


    }
    
}

function calcularPaginas(total) {
    return parseInt(Math.ceil(total/registrosPorPagina));
    
}