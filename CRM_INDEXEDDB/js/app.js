import { obtenerClientes, eliminarRegistro } from "../modulos/funciones.js";

let DB;

const listadoClientes = document.querySelector("#listado-clientes");
document.addEventListener("DOMContentLoaded", () => {
    //Crea la base de datos
    crearDB();

    //Listar

    if (window.indexedDB.open("crm", 1)) {
        obtenerClientes();
    }

    listadoClientes.addEventListener("click", eliminarRegistro);
});

function crearDB() {
    const crearDB = window.indexedDB.open("crm", 1);

    crearDB.onerror = function () {
        console.log("No se pudo crear lo lamento");
    };

    crearDB.onsuccess = () => {
        DB = crearDB.result;
    };

    crearDB.onupgradeneeded = (e) => {
        const db = e.target.result;

        const objectStore = db.createObjectStore("crm", {
            keyPath: "id",
            autoIncrement: true,
        });

        objectStore.createIndex("nombre", "nombre", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("telefono", "telefono", { unique: false });
        objectStore.createIndex("empresa", "empresa", { unique: false });
        objectStore.createIndex("id", "id", { unique: true });
    };
}
