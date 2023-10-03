import { actualizarCliente, obtenerCliente } from "./API.js";
import {mostraAlerta, validar} from './funciones.js';

(function(){

    //CAMPOS A LLENAR
    const nombreinput = document.querySelector('#nombre');
    const Correoinput = document.querySelector('#email');
    const telefonoinput = document.querySelector('#telefono');
    const empresainput = document.querySelector('#empresa');
    const idinput = document.querySelector('#id');


    document.addEventListener('DOMContentLoaded', async ()=>{
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parseInt(parametrosURL.get('id'));

        const cliente = await obtenerCliente(idCliente)
        mostrarCliente(cliente)

        //SUBMIT FORM
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarClietne);

    })

    function mostrarCliente(cliente) {
        const {nombre, empresa,Correo, telefono, id} = cliente;

        nombreinput.value = nombre;
        empresainput.value = empresa;
        Correoinput.value = Correo;
        telefonoinput.value = telefono;
        idinput.value = id;


    }


    function validarClietne(e) {
        e.preventDefault()
     
        const Cliente = {
            nombre: nombreinput.value,
            Correo: Correoinput.value,
            telefono: telefonoinput.value,
            empresa: empresainput.value,
            id: idinput.value
        }


        if(validar(Cliente)){
            //Mostrar Mensaje
            mostraAlerta('Todos los campos son necesarios')
        }
        
        actualizarCliente(Cliente)
    }
})();