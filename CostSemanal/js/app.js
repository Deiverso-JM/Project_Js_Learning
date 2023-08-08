//Variables y selectores
const formmulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");


//Eventos
eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);

    formmulario.addEventListener("submit", agregarGasto);
}
//Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado  = this.gastos.reduce((total,gasto)=> total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
        console.log(this.restante);

    }   

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id );
        this.calcularRestante();
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        //Destructurar
        const { presupuesto, restante } = cantidad;

        //Insertar
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement("p");
        divMensaje.classList.add("text-center", "alert");

        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        //Mensaje de error

        divMensaje.textContent = mensaje;

        //Insertar

        document
            .querySelector(".primario")
            .insertBefore(divMensaje, formmulario);

        //Quitar

        setTimeout(() => {
            divMensaje.remove();
        }, 2500);
    }


    mostrarGastos(gastos){
        
        //Limpiar
        this.limpiarHtml();

        //Iterar gastos
        gastos.forEach(gasto => {
 
            const { cantidad, nombre, id } = gasto;

            //Li
            const nuevoGasto = document.createElement("l1");
            nuevoGasto.className =
                "list-group-item d-flex justify-content-between align-items-center";
            nuevoGasto.dataset.id = id;

            //Agregar html
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill" > $ ${cantidad} </span>`;


            //Botton borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'borrar &times'
            btnBorrar.onclick =()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            //Agregar HTML

            gastoListado.appendChild(nuevoGasto);
        });



    }

    limpiarHtml(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }

    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoOBJ){
        const {presupuesto, restante } = presupuestoOBJ;

        const restanteDiv = document.querySelector('.restante');

        if( (presupuesto*0.20) >= restante){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');


        }else if((presupuesto*0.50) >= restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
            
        }

        if(restante <= 0){
            ui.imprimirAlerta('Se a agorado el prespuesto', 'error');

            formmulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

//Instancia global
const ui = new UI();
let presupuesto;

//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");

    //Validacion
    if (
        presupuestoUsuario === "" ||
        presupuestoUsuario === null ||
        isNaN(presupuestoUsuario) ||
        presupuestoUsuario <= 0
    ) {
        window.location.reload();
    }

    //Presupuesto valido

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);

}

//Añadir gastos
function agregarGasto(e) {
    e.preventDefault();

    

    const nombre = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);

    if (nombre === "" || cantidad === "") {
        ui.imprimirAlerta("ambos campos son obligatorios", "error");
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta("Cantidad no valida", "error");
        return;
    }

    //Objeto Gasto
    const gasto = { nombre, cantidad, id: Date.now() };

    //Lo añade con el spreed operator
    presupuesto.nuevoGasto(gasto);
    
   
    //Mensaje de succes
    ui.imprimirAlerta("Gasto agregado correctamente");

    // //Imprimir gastos
    const { gastos, restante } = presupuesto;

    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
    // //Reseteo
    formmulario.reset();
}


//Eliminar gasto

function eliminarGasto(id) {
    presupuesto.eliminarGasto(id);

    //ELimnar gastos
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
    
}