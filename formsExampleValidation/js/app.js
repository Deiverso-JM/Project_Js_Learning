//CARGAMOS TODO EL DOCUMENTO HTML PRIMERO
document.addEventListener("DOMContentLoaded", function () {
    //OBJETO CLAVE

    const email = {
        email: "",
        asunto: "",
        mensaje: "",
        CC: ""
    };

    //Seleccionamos los elementos en el dom mediante su id de los imputs
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const btnSumbit = document.querySelector(
        '#formulario button[type="submit"]'
    );
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");
    const inputCC = document.querySelector("#CC");

    //const formulario = document.querySelector("#formulario");

    //Asignar eventos - con sus funciones

    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);


    //SPINER
    formulario.addEventListener("submit", enviarEmail);

    //RETO
    inputCC.addEventListener("blur", validar)

    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        reiniciarObjeto();

    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {

            spinner.classList.remove("flex");
            spinner.classList.add("hidden");
            reiniciarObjeto();


            //CREAR UNA ALERTA

            const alertaExito =  document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounden-lg', 'mt-10', 'font-bold', 'text-sm',
            'uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);


            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);

    }


    function validar(e) {

        if (e.target.value.trim() === "" && e.target.id !== 'CC') {
            //LA FUNCION TRIME PARA ELIMNAR ESPACIOS-
            //RECOMENDABLE UTILIZAR PARA LOS FORMS PARA EVITAR ERRORES
            mostrarAlerta(
                `EL campo ${e.target.id} es requerido`,
                e.target.parentElement
            );
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es valido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }

       

        if(e.target.value.trim() !== '' && e.target.id === "CC" && !validarEmail(e.target.value)) {
            mostrarAlerta("El CC no es valido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        

        eliminarAlerta(e.target.parentElement);

        //ASIGNAR VALORES DE OBJETO
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //FUNCION COMPROBAR
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        //Limpiar alerta
        eliminarAlerta(referencia);

        //Generadomos un nuevo elemento de para el error en el html
        const error = document.createElement("P");

        error.textContent = mensaje;

        //Dandoles estilos
        error.classList.add(
            "bg-red-600",
            "p-2",
            "text-white",
            "text-center",
            "font-bold"
        );

        //Ingresar el errro al html o añadir las etiquetas
        referencia.appendChild(error);
    }

    function eliminarAlerta(referencia) {
        //COMPRUEBA SI YA EXISTE EL ELEMENTO ALERTA
        const alerta = referencia.querySelector(".bg-red-600");

        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if ((!Object.values(email).includes("")) || (( email['email'] !== '' && email['asunto'] !== '' && email['mensaje'] !== '' && email['CC'] === '')) ) {
            btnSumbit.classList.remove("opacity-50");
            btnSumbit.disabled = false;
        } else {
            btnSumbit.classList.add("opacity-50");
            btnSumbit.disabled = true;
        }
    }

    function reiniciarObjeto() {
        //REINICIAR EL OBJETO
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        email.CC = "";

        formulario.reset();
        comprobarEmail();
    }
});
