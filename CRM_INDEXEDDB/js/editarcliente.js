(function(){

    let DB;
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () =>{
        //Conectar DB  
        conectarDB()

        //Actualiza registro

        formulario.addEventListener('submit', actulizarCliente);


        //Verificar el id e la url
        const parametrosURL = new URLSearchParams(window.location.search);

        idCliente = parametrosURL.get('id');

        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente);
                
            }, 1000);
        }




    });

    function actulizarCliente(e) {
        e.preventDefault();
        if(nombreInput === '' || emailInput === '' || telefonoInput === '' || empresaInput === ''){
            imprimirAlerta('Todos los campos son obligatorios','error');                        
            return;
        }


        //Actualizar cliente

        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value, 
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado)

        transaction.oncomplete = function(){
            imprimirAlerta('Se actualizo correctamente');

            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000);
        }

        transaction.onerror = ()  =>{
            console.log('No se pudo')
        }

    }

    function imprimirAlerta(mensaje, tipo) {
        
        const advertencia = document.querySelector('.alerta');
        if(!advertencia){
            
            //Crear alerta
            const alerta = document.createElement('div');
            alerta.classList.add('px-4', 'py-3', 'rounded','max-w-lg','mx-auto', 'mt-6', 'text-center', 'border', 'alerta');
    
    
            if(tipo === 'error'){
                alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
    
            }else{
               console.log("Estoy aqui")
                alerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
            }
    
            alerta.textContent = mensaje;
    
            formulario.appendChild(alerta);
            
    
            setTimeout(() => {
                alerta.remove();
            }, 5000);
        }
        
    }


    function obtenerCliente(id) {

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm')

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e){
            const cursor = e.target.result;

            if(cursor){
                

                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);

                }

                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente) {
        const {nombre,telefono,email,empresa} = datosCliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;

        
    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);


        abrirConexion.onerror = () =>{
            console.log('Hubo un error');
        }
        abrirConexion.onsuccess = () =>{
            DB = abrirConexion.result;

        }
    }

})();