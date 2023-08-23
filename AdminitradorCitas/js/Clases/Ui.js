import { eliminarCita, modificarCita,DB} from "../funciones.js";
import { contenedorCitas } from "../Selectores.js";
import Citas from "./Citas.js";



class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

        //Tipo de error
        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document
            .querySelector("#contenido")
            .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        setTimeout(() => {
            divMensaje.remove();
        }, 2500);
    }

    agregarHtml() {
        this.limpiarHTML();

        //Leer el contenido de la base de datos
        const objectStore = DB.transaction("citas").objectStore('citas');
        
        objectStore.openCursor().onsuccess = function (e) {
        
            const cursor = e.target.result;

            if (cursor) {
                const {
                    mascota,
                    propietario,
                    telefono,
                    fecha,
                    hora,
                    sintomas,
                    id,
                } = cursor.value;

                const divCita = document.createElement("div");
                divCita.classList.add("cita", "p-3");
                divCita.dataset.id = id;

                //SCRIPTING

                const mascotaParrafo = document.createElement("h2");
                mascotaParrafo.classList.add(
                    "card-title",
                    "font-weight-bolder"
                );
                mascotaParrafo.textContent = mascota;

                const propietarioParrafo = document.createElement("p");
                propietarioParrafo.innerHTML = `
                        <span class="font-weight-bolder">Propietario: </span>${propietario}
                    `;

                const telefonoParrafo = document.createElement("p");
                telefonoParrafo.innerHTML = `
                        <span class="font-weight-bolder">Telefono: </span>${telefono}
                    `;

                const horaParrafo = document.createElement("p");
                horaParrafo.innerHTML = `
                        <span class="font-weight-bolder">Hora: </span>${hora}
                    `;

                const fechaParrafo = document.createElement("p");
                fechaParrafo.innerHTML = `
                        <span class="font-weight-bolder">Fecha: </span>${fecha}
                    `;

                const sintomasParrafo = document.createElement("p");
                sintomasParrafo.innerHTML = `
                        <span class="font-weight-bolder">Sintomas: </span>${sintomas}
                    `;

                //Boton

                const btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn", "btn-danger", "mr-2");
                btnEliminar.innerHTML = `ELIMINAR <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                    </svg>`;

                btnEliminar.onclick = () => eliminarCita(id);

                //ADD editar

                const btnModificar = document.createElement("button");
                btnModificar.classList.add("btn", "btn-info");
                btnModificar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    `;
                
                
                const cita  = cursor.value;
                btnModificar.onclick = () => modificarCita(cita);

                //Agregar
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnModificar);

                contenedorCitas.appendChild(divCita);


                cursor.continue();
            }
        };
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

export default UI;
