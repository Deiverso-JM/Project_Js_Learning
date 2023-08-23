import Citas from "./Clases/Citas.js";
import UI from "./Clases/Ui.js";

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    horaInput,
    sintomasInput,
    formulario,
    fechaInput,
} from "./Selectores.js";

//Clases
const ui = new UI();
const administrarCitas = new Citas();

export let DB;
let editando;

//Objeto
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
};

//Funciones

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
    e.preventDefault();
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (
        mascota === "" ||
        propietario === "" ||
        telefono === "" ||
        fecha === "" ||
        hora === "" ||
        sintomas === ""
    ) {
        ui.imprimirAlerta("Todos los campos deben estar llenos", "error");
        return;
    }

    if (editando) {
        //Pasar el objeto
        administrarCitas.editarCita({ ...citaObj });

        //Estamos editando indexDB
        const transaction = DB.transaction(['citas'], 'readwrite');
        console.log("Estoy aqui")
        const objectStore = transaction.objectStore('citas');

        objectStore.put(citaObj);
        
    
        transaction.oncomplete = () => {
            ui.imprimirAlerta("Se a Editado correctamente");

            formulario.querySelector('button[type="submit"]').textContent = "Crear cita";

            editando = false;
        };

        transaction.onerror = () =>{
            console.log('ERROR')
        }


    } else {
        //Generar
        citaObj.id = Date.now();
        console.log("Estoy aqui2")

        //Agregar cita
        administrarCitas.agregarCitas({...citaObj});

        //Insertar registro IndexeDB
        const transaction = DB.transaction(["citas"], "readwrite");

        const objectStore = transaction.objectStore("citas");

        objectStore.add(citaObj);


    }

    //Mensaje
    ui.imprimirAlerta("Se a agregado correctamente");

    //Reiniciar objeto
    reiniciarObjeto();

    //Resetear
    formulario.reset();

    //Agregar html
    ui.agregarHtml();
}

export function reiniciarObjeto() {
    citaObj.mascota = "";
    citaObj.hora = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.sintomas = "";
    citaObj.propietario = "";
}

//Eliminar

export function eliminarCita(id) {

    const transaction = DB.transaction( ['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');


    objectStore.delete(id);

    transaction.oncomplete = () => {
        //Muestre un mensaje
        ui.imprimirAlerta("La Cita se elimino correctamente");
        //Refrescar las citas
        ui.agregarHtml();
    }


    transaction.onerror = () =>{
        console.log('Hubo un error')
    }

}

//Carga

export function modificarCita(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //LLENAR FORM

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //TEXT CHANGE BTN

    formulario.querySelector('button[type="submit"]').textContent =
        "Guardar cambios";

    editando = true;
}

export function crearDB() {
    //Crear la base de datos BS1
    const crearDB = window.indexedDB.open("citas", 1);

    //Si hay un erorr
    crearDB.onerror = function () {

    };

    //Si todo sale bien
    crearDB.onsuccess = function () {


        DB = crearDB.result;

        //Mostrar citas al cargar en INDEXEDDB
        ui.agregarHtml();
    };

    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore("citas", {
            keyPath: "id",
            autoIncrement: true,
        });

        //Columnas

        objectStore.createIndex("mascota", "mascota", { unique: false });
        objectStore.createIndex("propietario", "propietario", {
            unique: false,
        });
        objectStore.createIndex("telefono", "telefono", { unique: false });
        objectStore.createIndex("fecha", "fecha", { unique: false });
        objectStore.createIndex("hora", "hora", { unique: false });
        objectStore.createIndex("sintomas", "sintomas", { unique: false });
        objectStore.createIndex("id", "id", { unique: true });


    
    };
}
