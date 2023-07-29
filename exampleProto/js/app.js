//Prototypos - Constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.tipo = tipo;
    this.year = year;
}

//Realiza la cotizacion e los datos

Seguro.prototype.cotizarSeguros = function () {
    /*
    1 = americano 1.15
    2 = americano 1.05
    3 = americano 1.35
    */



    let cantidad;
    const base = 5000;

    switch (this.marca) {
        case "1":
            cantidad = base * 1.15;
        case "2":
            cantidad = base * 1.05;
        case "3":
            cantidad = base * 1.35;

        default:
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    //Cada año se reduce un 3%

    cantidad -= (diferencia * 3 * cantidad) / 100;

    /* 
        Si el seguro es basico se multiplica por un 30% mas
        Si el seguro es Completo se multiplica por un 50% mas
    */



    if (this.tipo === "basico") {
        cantidad *= 1.3;
    } else {
        cantidad *= 1.5;
    }

    return cantidad;
};

function UI() {}

//llenar select
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector("#year");

    for (let i = max; i > min; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};

//Muestra alertas del formulario

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    //Variables
    const formulario = document.querySelector("#cotizar-seguro");
    const alerta = document.createElement("div");



    //Condicion
    if (tipo === "error") {
        alerta.classList.add("mensaje", "error", "mt-10");
    } else {
        alerta.classList.add("mensaje", "correcto", "mt-10");
    }

    alerta.textContent = mensaje;

    //Insertar HTML
    formulario.insertBefore(alerta, document.querySelector("#resultado"));

    setTimeout(() => {
        alerta.remove();
    }, 2500);
};

//Mostrar resultado

UI.prototype.mostrarResultado = (seguro, total) => {
   
    const {marca, year, tipo} = seguro;


    let textmarca;

    switch (marca) {
        case '1':
            textmarca = 'Americado';
        case '2':
            textmarca = 'Asiatico'; 
        case '3':
            textmarca = 'Europeo'; 
        default:
            break;
    }

    console.log(textmarca)

    //Resultado Crear
    const div = document.createElement("div");
    div.classList.add("mt-10");

    div.innerHTML = `
        <p class="header">Tu resumen</p>
        
        <p class="font-bold">Marca: <span class="font-normal" >${textmarca}</span> </p>
        <p class="font-bold">Año: <span class="font-normal ">${year}</span> </p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span> </p>
        <p class="font-bold">Total: <span class="font-normal">${total}</span> </p>
    

    `;

    const resultado = document.querySelector("#resultado");


    //Spineer
    const spineer = document.querySelector("#cargando");
    spineer.style.display = "block";

    setTimeout(() => {
        spineer.style.display = "none";

        resultado.appendChild(div);
    }, 2500);
};

//Instaciar IU

const ui = new UI();

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones(); //Llena el select
});

addEventListeners();
function addEventListeners() {
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguros);
}

function cotizarSeguros(e) {
    e.preventDefault("No te tocaba");

    //Leer la marca Seleccionado
    const marca = document.querySelector("#marca").value;
    //Lee el año
    const year = document.querySelector("#year").value;
    //lee el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === "" || year === "" || tipo === "") {
        return ui.mostrarMensaje("Debes rellenar los campos", "error");
    }

    ui.mostrarMensaje("Cotizando...", "exito");
    

    //Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div')
    if(resultados != null){
        resultados.remove();
    }
    //Instaciar el prototipe
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguros();
    //El resultado

    ui.mostrarResultado(seguro, total);
}
