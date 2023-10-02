const criptoMonedas = document.querySelector('#criptomonedas');
const selectMonedas = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado  = document.querySelector('#resultado');

const  objBusqueda = {
    moneda: '',
    criptomoneda: ''
}



//Crear promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded', ()=>{
    consultarCripto()

    formulario.addEventListener('submit', submitFormulario);

    criptoMonedas.addEventListener('change', leerValor);
    selectMonedas.addEventListener('change', leerValor);

})

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();
    //Validar

    const {moneda, criptomoneda} = objBusqueda;

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Debes seleccionar los campos');
        return;
    }

    //Consultar la Api con los resultados
    consultarApi();
}

function mostrarAlerta(msg) {
    const alerta = document.querySelector('.error');
    if(!alerta){
        const alertaDiv = document.createElement('div')
        alertaDiv.classList.add('error');
        alertaDiv.textContent = msg
        formulario.appendChild(alertaDiv);

        setTimeout(() => {
            alertaDiv.remove()
        }, 2500);
    }
}

async function consultarCripto() {
    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    try {
        const respuesta  = await fetch(url);
        const resultado = await respuesta.json()
        const criptomendas = await obtenerCriptomonedas(resultado.Data)
        selectCripto(criptomendas)

    } catch (error) {
        console.log(error);
    }
}


function selectCripto(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const optionCrip = document.createElement('option');
        optionCrip.value = Name;
        optionCrip.textContent = FullName;

        criptoMonedas.appendChild(optionCrip)


        
    });
    
}

async function consultarApi() {
    const {moneda,criptomoneda} = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    // fetch(url)
    //     .then(respuesta => respuesta.json())
    //     .then(resultado => mostrarCotizacionHTML(resultado.DISPLAY[criptomoneda][moneda]))

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        mostrarCotizacionHTML(resultado.DISPLAY[criptomoneda][moneda])
    } catch (error) {
        console.log(error)
    }
}

function mostrarCotizacionHTML(cotizacion) {
    mostrarSpiner()

    setTimeout(() => {
        while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild);
        }    
        
        const {CHANGEDAY,PRICE,HIGHDAY, HIGHHOUR }  = cotizacion;
    
        const precio = document.createElement('p');
        precio.classList.add('precio')
        precio.innerHTML = ` El precio actual es: <span>${PRICE}</span>`
    
        const precioAlto = document.createElement('p');
        precioAlto.classList.add('precio')
        precioAlto.innerHTML = ` El precio mas alto es: <span>${HIGHDAY}</span>`
    
    
        const precioHora = document.createElement('p');
        precioHora.classList.add('precio')
        precioHora.innerHTML = ` El precio actual de hora es: <span>${HIGHHOUR}</span>`
    
        const CambioDia = document.createElement('p');
        CambioDia.classList.add('precio')
        CambioDia.innerHTML = ` El precio a cambio de dia es: <span>${CHANGEDAY}</span>`
        
        resultado.appendChild(precio); 
        resultado.appendChild(precioAlto); 
        resultado.appendChild(precioHora); 
        resultado.appendChild(CambioDia); 
    }, 2500);
    
    

}


function mostrarSpiner() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }    
    
    const spiner = document.createElement('div');

    spiner.innerHTML = `
        <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
        </div>
    `

    resultado.appendChild(spiner);


}