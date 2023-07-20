//Variables

const carrito  = document.querySelector('#carrito');
const ListaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')

let articulosCarrito = [];

cargarEventListeners();

//Cargando los eventos 
function cargarEventListeners(){

    ListaCursos.addEventListener('click', agregarCurso);

    //Elimina objetos del carrito
    carrito.addEventListener('click', eliminarCurso);


    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    })
}


//Funciones 

function agregarCurso(e){

    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')  ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

//Elimnar funcion

function eliminarCurso(e){


    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);

    }

    carritoHTML(); //Volvemos a iterrar sobre el carro y mostramos su HTML
}


//Leer contenido + objeto con los atributos

function leerDatosCursos(curso){

    //Objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //Revisar si ya se encuentra el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado 
            }else{
                return curso; //Retorna los objetos que no son los duplicados

            }
        })
        articulosCarrito=[...cursos]
    }else{

        //Arreglo del carro
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);
    carritoHTML();
}


//Muestra el Carrito de compras en el HTML

function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=` 
        <th> <img src="${imagen}" width="150"> </th>
        <th>  ${titulo} </th>
        <th>  ${precio} </th>
        <th>  ${cantidad} </th>  
        <th>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>        
        </th>   

        `


        //Agrega el html del carrito en tbody
        contenedorCarrito.appendChild(row);
    })

}

function limpiarHTML(){
    //Primera forma
    // contenedorCarrito.innerHTML = '';

    //Segunda forma
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


