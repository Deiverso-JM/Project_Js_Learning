
//Variables
const marca = document.querySelector('#marca');
const precioMinimo = document.querySelector('#minimo');
const precioMaximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');


const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');

const max = new Date().getFullYear();
const min = max - 10;

//Generar objeto consulta

const datosBusqueda= {
    marca: '',
    year: '',
    precioMinimo: '',
    precioMaximo: '',
    puertas: '',
    marca: '',
    color: '',
    transmision: '',
}



//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos);//Muestra los automobiles
    llenarSelect();//Llena las opciones
});


//Eventos forms
year.addEventListener('change', (e)=>{
    datosBusqueda.year =  e.target.value;
    filtrarBusqueda()
    
});

color.addEventListener('change', (e)=>{
    datosBusqueda.color =  e.target.value;
    filtrarBusqueda();
    
});

precioMaximo.addEventListener('change', (e)=>{
    datosBusqueda.precioMaximo =  e.target.value;
    filtrarBusqueda();
    
});

marca.addEventListener('change', (e)=>{
    datosBusqueda.marca =  e.target.value;
    filtrarBusqueda();

    
});

precioMinimo.addEventListener('change', (e)=>{
    datosBusqueda.precioMinimo =  e.target.value;
    filtrarBusqueda();
    
});

puertas.addEventListener('change', (e)=>{
    datosBusqueda.puertas =  e.target.value;
    filtrarBusqueda();
    
    
});


transmision.addEventListener('change', (e)=>{
    datosBusqueda.transmision =  e.target.value;
    filtrarBusqueda();
    
});



//Funcion mostrar 

function mostrarAutos(autos){

    limpiarAutos(resultado);
    autos.forEach(auto => {


        const {marca,modelo,year,puertas,precio,color,transmision} = auto;
        const autoHtml = document.createElement('p');

        autoHtml.textContent =`
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision}
            - Precio:  ${precio} - Color: ${color} `;


        //Insertar en el html
        resultado.appendChild(autoHtml);
    });


};

//Limpiar

function limpiarAutos(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}


//llena select
function llenarSelect(){

    for(let i = max; i>min; i--){
        const opcion = document.createElement('option');
        opcion.value= i;
        opcion.textContent = i;
        year.appendChild(opcion); //Agrega las opciones del año   
    };
};
 

//filtro
function filtrarBusqueda() {
    const resultado = autos.filter(auto =>{
        const {marca} = datosBusqueda;
        if(marca){
            return auto.marca === marca;
        }
        return auto;
    }).filter( auto => {
        const {year} = datosBusqueda;
        if(year){
            return auto.year === parseInt(year);
        }
        return auto;
    }).filter(auto =>{
        const {precioMaximo} = datosBusqueda;
        if(precioMaximo){
            return auto.precio <= parseFloat(precioMaximo)
        }
        return auto

    }).filter(auto =>{
        const {precioMinimo} = datosBusqueda;
        if(precioMinimo){
            return auto.precio >= parseFloat(precioMinimo)
        }
        return auto
    }).filter(auto => {
        const {puertas} = datosBusqueda;
        if(puertas){
            return auto.puertas === parseInt(puertas);
        }
        return auto;
    }).filter(auto => {
        const {color} = datosBusqueda;
        if(color){
            return auto.color === color;
        }
        return auto;
    }).filter(auto => {
        const {transmision} = datosBusqueda;    
        if(transmision){
            return auto.transmision === transmision;
        }
        return auto;
    });
    

    console.log(resultado)

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }

};



function noResultado(){

    limpiarAutos();

    const noResultado= document.createElement('div');
    noResultado.textContent = "No aparecen resultados";
    noResultado.classList.add('alerta', 'error');
    resultado.appendChild(noResultado);

};