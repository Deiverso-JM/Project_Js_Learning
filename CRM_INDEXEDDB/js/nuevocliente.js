(function(){
    let DB;
    const formulario = document.querySelector('#formulario');


    document.addEventListener('DOMContentLoaded', () =>{
        conectarDB();


        formulario.addEventListener('submit', validarCliente);
    })


    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);


        abrirConexion.onerror = () =>{
            console.log('Hubo un error');
        }
        abrirConexion.onsuccess = () =>{
            DB = abrirConexion.result;

        }
        
    };


    function validarCliente(e){
        e.preventDefault();

        //Leer los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios','error');                        
            return;
        }


        //Crear un objeto de informacion

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now(),
        }


        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = () =>{
            imprimirAlerta("Hubo un error al crear cliente", 'error');
        }


        transaction.oncomplete = () =>{

            imprimirAlerta('El cliente se agrego correctamente')

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

})();