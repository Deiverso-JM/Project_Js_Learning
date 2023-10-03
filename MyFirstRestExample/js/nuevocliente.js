import {mostraAlerta,validar} from './funciones.js'
import {nuevoCliente} from './API.js'


(function() {
    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e) {

        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const Correo = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const Cliente = {
            nombre,
            Correo,
            telefono,
            empresa
        }

        if(validar(Cliente)){
            mostraAlerta("Debes llenar todos los datos")
            return
        }

        nuevoCliente(Cliente)
    }





})();