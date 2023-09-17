const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault()
    limpiarHTML()

    //Validar 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostarMensaje('Se debe ingresar los datos en los campos')
        return;
    }
    
    //Consultar API

    consultarAPI(ciudad, pais);

}



function mostarMensaje(mensaje){
    const alerta = document.querySelector('.bg-red-100')
    
    if(!alerta){
        
        //Alerta
        const div = document.createElement('div');
        div.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded','max-w-md','mx-auto', 'mt-6', 'text-center');
    
    
        div.innerHTML=`
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(div);


        setTimeout(() => {
                div.remove()
        }, 2500);
    }

}


function consultarAPI(ciudad, pais) {
    const appID = 'f2846962ab400a83786c82eb58954ad0';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
    
    spiner()

    setTimeout(() => {

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {
                //Limpiar 
                limpiarHTML();
                console.log(datos);
                if(datos.cod === '404'){
                    mostarMensaje('Ciudad No encontrada');
                    return;
                }
                
                //Mostrar respuesta
                mostrarRespuesta(datos);
    
            })
            .catch(error => console.log(error));
    }, 2500);
}

function mostrarRespuesta(datos) {
    const {name,main: {temp, temp_max,temp_min}} = datos;
    const centigrados =  kelvinCentigrados(temp);
    const max =  kelvinCentigrados(temp_max);
    const min =  kelvinCentigrados(temp_min);


    const nombre = document.createElement('p');
    nombre.textContent  = `El clima de ${name} es:`;
    nombre.classList.add('font-bold', 'text-4xl');


    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Maxima: ${max} &#8451`;
    tempMaxima.classList.add('font-bold', 'text-2xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Minima: ${min} &#8451`;
    tempMinima.classList.add('font-bold', 'text-xl');



    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    

    resultado.appendChild(resultadoDiv);
    
}

const kelvinCentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    };

}

function spiner() {
    const divSpiner = document.createElement('div');
    divSpiner.classList.add('sk-cube-grid');

    divSpiner.innerHTML = `
    <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    </div>
     `;

    resultado.appendChild(divSpiner);

}