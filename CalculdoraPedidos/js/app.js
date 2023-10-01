let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1:'Comida',
    2:'Bebidas',
    3:'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente')
btnGuardarCliente.addEventListener('click', guardaCliente);

function guardaCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;
    
    //Revisar si hay campos vacios
    const camposVacios = [mesa,hora].some(campo => campo === '');
    
    if(camposVacios){

        //Validar si hay alerta
        const existeAlert = document.querySelector('.invalid-feedback')
        const alert = document.querySelector('div');
        if(!existeAlert){
            alert.textContent = 'Todos los campos son obligatorios'
            alert.classList.add('invalid-feedback', 'd-block', 'text-center');
            document.querySelector('.modal-body form').appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 3000);
     
        }
   
        return
    }

    //Asignar datos del cliente
    cliente = {...cliente,mesa, hora}
    
    //Ocultar modal

    const modalFormulario = document.querySelector('#formulario')
    const modalBosstrap = bootstrap.Modal.getInstance(modalFormulario)

    modalBosstrap.hide()

    //mostrar S
    mostrarSecciones()

    //Obtener platillos Json
    obtenerPlatillos()

    

    
}

function mostrarSecciones() {
    const seccionOcultas = document.querySelectorAll('.d-none')
    seccionOcultas.forEach(seccion  =>{
        seccion.classList.remove('d-none')
    })
}

function obtenerPlatillos() {
    const url = `http://localhost:3000/platillos`
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido =document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const row = document.createElement('div')
        row.classList.add('row', 'py-3', 'border-top')
        
        
        const nombre = document.createElement('div')
        nombre.classList.add('col-md-4')
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('div')
        precio.classList.add('col-md-3', 'fw-bold')
        precio.textContent = `$${platillo.precio}`

        const categoria = document.createElement('div')
        categoria.classList.add('col-md-3')
        categoria.textContent = categorias[platillo.categoria]


        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0
        inputCantidad.value = 0
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');


        //Funcion que detecta cantidad y platillo
        inputCantidad.onchange =function(){
           
           const cantidad = parseInt(inputCantidad.value);
           agregarPlatillo({...platillo, cantidad})
        };

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2')
        agregar.appendChild(inputCantidad);
        
        row.appendChild(nombre)
        row.appendChild(precio)
        row.appendChild(categoria)
        row.appendChild(agregar)

        contenido.appendChild(row)
    });

}

function agregarPlatillo(platillo) {
    //Extraemos el arreglo del objeto
    let {pedido}=cliente 
    
    if(platillo.cantidad > 0){

        //Verificamos si el articulo ya se enecunetra
        if(pedido.some(articulo => articulo.id === platillo.id)){
            //El articulo existe, actualizamos 
            const pedidoActualizado = pedido.map(articulo => {
                if(articulo.id === platillo.id){
                    articulo.cantidad = platillo.cantidad
                }

                return articulo
            })

            //Se asigna el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado]
        }else{
            //El articulo no existe - agregamos
            cliente.pedido = [...pedido,platillo]
        }

    }else{
        //Eliminar elementos
        const resultado  = pedido.filter(articulo  => articulo.id !== platillo.id)
        cliente.pedido = [...resultado]
    }

    //Limpiar HTML
    limpiarHTML()

    if(cliente.pedido.length){
        //Mostrar el resumen
        actualizarResumen();
    }else{
        mensajePedidoVacio()
    }
}

function actualizarResumen() {
    

    const contenido = document.querySelector('#resumen .contenido');
    
    
    const resumen = document.createElement('div')
    resumen.classList.add('col-md-6', 'card','py-3', 'px-3', 'shaow')
    
    //Informacion de la mesa
    const mesa = document.createElement('p');
    mesa.textContent = `Mesa: `;
    mesa.classList.add('fw-bold')

    
    const spanMesa = document.createElement('SPAN')
    spanMesa.textContent = cliente.mesa;
    spanMesa.classList.add('fw-normal')

    //Informacion de la hora
    const hora = document.createElement('p');
    hora.textContent = `Hora: `;
    hora.classList.add('fw-bold')

    
    const spanHora = document.createElement('SPAN')
    spanHora.textContent = cliente.hora;
    spanHora.classList.add('fw-normal')

    //Agregar a los elementos padre
    mesa.appendChild(spanMesa);
    hora.appendChild(spanHora);

    //Titulo de la seccion
    const heading = document.createElement('h3')
    heading.textContent = 'Platillos Consumidos'
    heading.classList.add('my-4', 'text-center')

    //Iterar sobre el arrray
    const grupo =document.createElement('ul');
    grupo.classList.add('list-group')
    
    const {pedido} =  cliente

    pedido.forEach(articulo =>{
        const {nombre, cantidad, precio, id }= articulo
        
        const li = document.createElement('li');
        li.classList.add('list-group-item')

        const nombreEl = document.createElement('h4')
        nombreEl.classList.add('my-4')
        nombreEl.textContent = nombre;

        //Cantidad del articulo
        const cantidadEl = document.createElement('p');
        cantidadEl.classList.add('fw-bold')
        cantidadEl.textContent = 'Cantidad: '

        const spanCantidad = document.createElement('SPAN')
        spanCantidad.textContent = cantidad;
        spanCantidad.classList.add('fw-normal')

        //Precio articulo
        const precioEl = document.createElement('p');
        precioEl.classList.add('fw-bold')
        precioEl.textContent = 'Precio: '
        
        const spanPrecio = document.createElement('SPAN')
        spanPrecio.textContent = `$${precio}`;
        spanPrecio.classList.add('fw-normal')

        //Subtotal articulo
        const subtotalEl = document.createElement('p');
        subtotalEl.classList.add('fw-bold')
        subtotalEl.textContent = 'Subtotal: '
        
        const spansubtotal = document.createElement('SPAN')
        spansubtotal.textContent = precio*cantidad;
        spansubtotal.classList.add('fw-normal')


        //button para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger');
        btnEliminar.textContent = 'Eliminar el pedido'
      
        //Funcion eliminar producto
        btnEliminar.onclick = ()=>{
            eliminarProducto(id)
        }

        //Button para editar
        const btnModificar = document.createElement('button');
        btnModificar.classList.add('btn', 'btn-danger');
        btnModificar.textContent = 'Modificar el pedido'




        //Agregar a sus padres
        cantidadEl.appendChild(spanCantidad)
        precioEl.appendChild(spanPrecio)
        subtotalEl.appendChild(spansubtotal)



        //Agregar elemento al Li
        li.appendChild(nombreEl);
        li.appendChild(cantidadEl);
        li.appendChild(precioEl);
        li.appendChild(subtotalEl);
        li.appendChild(btnEliminar)
    



        //Agregar lista al grupo principal
        grupo.appendChild(li)
    })

    //Agregar contenido
    resumen.appendChild(heading)
    resumen.appendChild(mesa)
    resumen.appendChild(hora)
    resumen.appendChild(grupo)

    
    contenido.appendChild(resumen);

    //Mostrar formulario de propinas
    formularioPropinas()
}


function limpiarHTML() {
    const contenido = document.querySelector('#resumen .contenido');

    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild)
    }

    
}

function eliminarProducto(id){
    const { pedido } = cliente;
    const resultado = pedido.filter(articulo => articulo.id !== id);
    cliente.pedido = [...resultado];

    console.log(cliente.pedido)
    //Limpiar HTML
    limpiarHTML()

    if(cliente.pedido.length){
        //Mostrar el resumen
        actualizarResumen();
    }else{
        mensajePedidoVacio();
    }

    //El producto se elimino por lo tanto regresamos la cantidad a 0 de los platos
    const productoEliminado = `#producto-${id}`;

    const inputEliminado = document.querySelector(productoEliminado)
    inputEliminado.value = 0;

}

function mensajePedidoVacio() {
    const contenido = document.querySelector('#resumen .contenido')

    const texto = document.createElement('p')
    texto.classList.add('text-center')
    texto.textContent = 'Añade los elementos del pedido'

    contenido.appendChild(texto);

}


function formularioPropinas() {
    const contenido = document.querySelector('#resumen .contenido');

    const formulario = document.createElement('div')
    formulario.classList.add('col-md-6', 'formulario');

    const divFormulario = document.createElement('div')
    divFormulario.classList.add( 'card', 'py-3', 'px-3', 'shadow');

    const heading = document.createElement('h3')
    heading.classList.add('my-4', 'text-center')
    heading.textContent = 'Propina'


    //Radios button

    //Radios 10%
    const radio10 = document.createElement('input');
    radio10.type = 'radio';
    radio10.name = 'propina'
    radio10.value = '10';
    radio10.classList.add('form-check-input')

    const radio10Label = document.createElement('label')
    radio10Label.textContent = '10%';
    radio10Label.classList.add('form-check-label')

    const radio10div = document.createElement('div')
    radio10div.classList.add('form-check');

    radio10.onclick = calcularPropina

    radio10div.appendChild(radio10)
    radio10div.appendChild(radio10Label)

    
    //Radios 25%
    const radio25 = document.createElement('input');
    radio25.type = 'radio';
    radio25.name = 'propina'
    radio25.value = '25';
    radio25.classList.add('form-check-input')

    const radio25Label = document.createElement('label')
    radio25Label.textContent = '25%';
    radio25Label.classList.add('form-check-label')

    const radio25div = document.createElement('div')
    radio25div.classList.add('form-check');
    
    radio25.onclick = calcularPropina

    radio25div.appendChild(radio25)
    radio25div.appendChild(radio25Label)


    
    //Radios 50%
    const radio50 = document.createElement('input');
    radio50.type = 'radio';
    radio50.name = 'propina'
    radio50.value = '50';
    radio50.classList.add('form-check-input')

    const radio50Label = document.createElement('label')
    radio50Label.textContent = '50%';
    radio50Label.classList.add('form-check-label')

    const radio50div = document.createElement('div')
    radio50div.classList.add('form-check');

    //FUncion

    radio50.onclick = calcularPropina
    radio50div.appendChild(radio50)
    radio50div.appendChild(radio50Label)



    //Agreagar div principal
    divFormulario.appendChild(heading)
    divFormulario.appendChild(radio10div)
    divFormulario.appendChild(radio25div)
    divFormulario.appendChild(radio50div)

    formulario.appendChild(divFormulario)
    contenido.appendChild(formulario)
}


function calcularPropina() {
    const {pedido}  =cliente;

    let subtotal = 0;

    //Calcular subtotal
    pedido.forEach(articulo =>{
        subtotal += articulo.cantidad * articulo.precio;
    })

    //Seleccionar el radio button con la propina del cliente
    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value;
    
    //Calcular la propoina
    const propina = ((subtotal* parseInt(propinaSeleccionada))/100);

    //Total 
    const total = subtotal+propina;

    mostrarTotalHTML(subtotal, total, propina);
}

function mostrarTotalHTML(subtotal,total,propina) {
    
    
    //TOTALES
    const divTotales =document.createElement('div');
    divTotales.classList.add('total-pagar')





    //Subtotal
    const subtotalParrafo = document.createElement('p');
    subtotalParrafo.classList.add('fs-5', 'fw-bold', 'mt-2');
    subtotalParrafo.textContent = 'Subtotal Consumo: '

    const subtotalSpan = document.createElement('span');
    subtotalSpan.classList.add('fw-normal');
    subtotalSpan.textContent = `$${subtotal}`

    subtotalParrafo.appendChild(subtotalSpan)

    //Propina
    const propinaParrafo = document.createElement('p');
    propinaParrafo.classList.add('fs-5', 'fw-bold', 'mt-2');
    propinaParrafo.textContent = 'Propina: '

    const propinaSpan = document.createElement('span');
    propinaSpan.classList.add('fw-normal');
    propinaSpan.textContent = `$${propina}`

    propinaParrafo.appendChild(propinaSpan)


    //Total
    const TotalParrafo = document.createElement('p');
    TotalParrafo.classList.add('fs-5', 'fw-bold', 'mt-2');
    TotalParrafo.textContent = 'Total: '

    const SpanTotal = document.createElement('span');
    SpanTotal.classList.add('fw-normal');
    SpanTotal.textContent = `$${total}`

    TotalParrafo.appendChild(SpanTotal)
    

    //Eliminar el utilmo resultado
    const totalPagarDiv = document.querySelector('.total-pagar')
    if(totalPagarDiv){
        totalPagarDiv.remove()
    }
    
    //DIV TOTAL TODO - AGREGAR
    divTotales.appendChild(subtotalParrafo)
    divTotales.appendChild(propinaParrafo)
    divTotales.appendChild(TotalParrafo)



    const formulario = document.querySelector('.formulario > div');
    formulario.appendChild(divTotales)
    console.log(formulario)
}