import { validarCliente, conectarDB } from "../modulos/funciones.js";

let DB;
console.log('QUE')
const formulario = document.querySelector("#formulario");

document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    formulario.addEventListener("submit", validarCliente);
});
