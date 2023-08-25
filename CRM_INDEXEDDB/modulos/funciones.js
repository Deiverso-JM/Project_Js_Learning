import { emailInput, nombreInput, empresaInput, telefonoInput} from '../js/editarcliente.js'

let DB;
let idCliente;
//Crea la base de datos de indexDB

export function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = () => {
        console.log("Hubo un error");
    };
    abrirConexion.onsuccess = () => {
        DB = abrirConexion.result;
    };
}

export function validarCliente(e) {
    e.preventDefault();

    //Leer los inputs
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
        imprimirAlerta("Todos los campos son obligatorios", "error");
        return;
    }

    //Crear un objeto de informacion

    const cliente = {
        nombre,
        email,
        telefono,
        empresa,
        id: Date.now(),
    };

    crearNuevoCliente(cliente);
}

export function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");

    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);

    transaction.onerror = () => {
        imprimirAlerta("Hubo un error al crear cliente", "error");
    };

    transaction.oncomplete = () => {
        imprimirAlerta("El cliente se agrego correctamente");
    };
}

export function imprimirAlerta(mensaje, tipo) {
    const advertencia = document.querySelector(".alerta");
    if (!advertencia) {
        //Crear alerta
        const alerta = document.createElement("div");
        alerta.classList.add(
            "px-4",
            "py-3",
            "rounded",
            "max-w-lg",
            "mx-auto",
            "mt-6",
            "text-center",
            "border",
            "alerta"
        );

        if (tipo === "error") {
            alerta.classList.add(
                "bg-red-100",
                "border-red-400",
                "text-red-700"
            );
        } else {
            console.log("Estoy aqui");
            alerta.classList.add(
                "bg-green-100",
                "border-green-400",
                "text-green-700"
            );
        }

        alerta.textContent = mensaje;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

export function obtenerCliente(id) {
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

export function llenarFormulario(datosCliente) {
    const { nombre, telefono, email, empresa } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
}

export function eliminarRegistro(e) {
    if (e.target.classList.contains("eliminar")) {
        const idEliminar = Number(e.target.dataset.cliente);

        const confirmar = confirm("Deseas eliminar este cliente");

        console.log(confirmar);

        if (confirmar) {
            const transaction = DB.transaction(["crm"], "readwrite");
            const objectStore = transaction.objectStore("crm");

            objectStore.delete(idEliminar);

            transaction.oncomplete = function () {
                console.log("Eliminado");

                e.target.parentElement.parentElement.remove();
            };

            transaction.onerror = function () {
                console.log("Hubo un error");
            };
        }
    }
}

export function obtenerClientes() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = () => {
        console.log("Error al listar clientes");
    };

    abrirConexion.onsuccess = () => {
        DB = abrirConexion.result;
        const objectStore = DB.transaction("crm").objectStore("crm");

        objectStore.openCursor().onsuccess = function (e) {
            const cursor = e.target.result;

            if (cursor) {
                const { nombre, empresa, email, telefono, id } = cursor.value;

                const listadoClientes =
                    document.querySelector("#listado-clientes");

                listadoClientes.innerHTML += ` <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            </tr>
        `;
                cursor.continue();
            } else {
                console.log("No hay mas registros");
            }
        };
    };
}

