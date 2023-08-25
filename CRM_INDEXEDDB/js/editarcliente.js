import { llenarFormulario, imprimirAlerta } from "../modulos/funciones.js";

let DB;
let idCliente;

export const nombreInput = document.querySelector("#nombre");
export const emailInput = document.querySelector("#email");
export const telefonoInput = document.querySelector("#telefono");
export const empresaInput = document.querySelector("#empresa");

const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
    //Conectar DB
    conectarDB();

    //Actualiza registro
    console.log(formulario);
    formulario.addEventListener("submit", actulizarCliente);

    //Verificar el id e la url
    const parametrosURL = new URLSearchParams(window.location.search);

    idCliente = parametrosURL.get("id");

    if (idCliente) {
        setTimeout(() => {
            obtenerCliente(idCliente);
        }, 1000);
    }
});

function actulizarCliente(e) {
    e.preventDefault();
    if (
        nombreInput === "" ||
        emailInput === "" ||
        telefonoInput === "" ||
        empresaInput === ""
    ) {
        imprimirAlerta("Todos los campos son obligatorios", "error");
        return;
    }

    //Actualizar cliente

    const clienteActualizado = {
        nombre: nombreInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        empresa: empresaInput.value,
        id: Number(idCliente),
    };
    console.log(clienteActualizado);

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.put(clienteActualizado);

    transaction.oncomplete = function () {
        imprimirAlerta("Se actualizo correctamente");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    };

    transaction.onerror = () => {
        console.log("No se pudo");
    };
}

function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = () => {
        console.log("Hubo un error");
    };
    abrirConexion.onsuccess = () => {
        DB = abrirConexion.result;
    };
}



function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {
            if (cursor.value.id === Number(id)) {
                llenarFormulario(cursor.value);
            }

            cursor.continue();
        }
    };
}