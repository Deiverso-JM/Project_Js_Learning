function iniciarApp() {
    const selectCategorias = document.querySelector('#categorias');
    const resultado = document.querySelector('#resultado');
    const modal = new bootstrap.Modal('#modal', {});

    if(selectCategorias){
        selectCategorias.addEventListener('change', selectCategoria);
        obtenerCategorias();
    }

    const favoritosDiv = document.querySelector('.favoritos')
    if(favoritosDiv){
        obtenerFavoritos();
    }



    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostraCategorias(resultado.categories))
    }   
    
    function mostraCategorias(categories = []) {
        categories.forEach(categoria =>{
            const option  = document.createElement('option');
            option.value =categoria.strCategory;
            option.textContent =categoria.strCategory;
            selectCategorias.appendChild(option);
        })
    }

    function selectCategoria(e) {
        const categoria = e.target.value;
        const url  = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;


        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarResetas(resultado.meals));

    }

    function mostrarResetas(recetas = []) {
        limpiarHTML(resultado)

        const heading = document.createElement('h2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';

        resultado.appendChild(heading); 

        //Iteracion de recetas
        recetas.forEach(receta => {
            
            //DESTR
            const {idMeal, strMeal, strMealThumb} = receta;

            const recetaContenedor = document.createElement('div');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('div')
            recetaCard.classList.add('card', 'mb-4');
            

            const recetaImagen = document.createElement('img');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta: ${strMeal ?? receta.titulo}`;
            recetaImagen.src = strMealThumb ?? receta.img;


            const recetaCardBody = document.createElement('div');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('h3');
            recetaHeading.classList.add('card-tittle', 'mb-3');
            recetaHeading.textContent = strMeal ?? receta.titulo;

            const recetaButton = document.createElement('button');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = existeStorage(idMeal) ? 'Eliminar reseta' : 'Guardar Favorito';

            recetaButton.onclick =function(){
                seleccionarReceta(idMeal ?? receta.id);
            }

            //Inyectar
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);
            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);
            recetaContenedor.appendChild(recetaCard); 
            resultado.appendChild(recetaContenedor)
        });
        
    }

    function seleccionarReceta(id) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => showModalRecet(resultado.meals[0]));
    }


    function showModalRecet(receta) {
        const {idMeal, strInstructions, strMeal,strMealThumb } = receta;

        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        //Mostrar contenido
        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3" >Ingredientes y cantidades</h3>
        `

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');


        //Mostrar cantidades
        for (let i = 0; i <= 20; i++) {
            if(receta[`strIngredient${i}`]){
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item')
                ingredienteLi.textContent = `${ingrediente} - ${cantidad} `


                listGroup.appendChild(ingredienteLi);
            }
            
        }

        modalBody.appendChild(listGroup);

        const modalFooter = document.querySelector('.modal-footer');
        limpiarHTML(modalFooter)

        //botones
        const btnCerrar = document.createElement('button');
        btnCerrar.classList.add('btn', 'btn-secondary', 'col');
        btnCerrar.textContent = 'Cerrar';

        btnCerrar.onclick = function(){
            modal.hide()
        }

        const btnFavorito = document.createElement('button');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = existeStorage(idMeal) ? 'Eliminar favoritos' : "Guardar Favoritos";

        btnFavorito.onclick = function() {

            if(existeStorage(idMeal)){
                eliminarStorage(idMeal)
                btnFavorito.textContent = 'Guardar Favorito'
                mostrarToast('Eliminado correctamente')
                return;
            }


            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                img: strMealThumb
            })

            btnFavorito.textContent = 'Eliminar Favorito'
            mostrarToast('Agregado correctamente')

            
        }

        modalFooter.appendChild(btnFavorito)
        modalFooter.appendChild(btnCerrar)

        //Show the modal
        modal.show()
    }

    function existeStorage(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }


    function eliminarStorage(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }

    function agregarFavorito(receta) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
        
    }

    function limpiarHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
            
        }
    }


    function mostrarToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv);
        toastBody.textContent = mensaje;

        toast.show();
    }


    function obtenerFavoritos() {

        
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        if(favoritos.length){
            mostrarResetas(favoritos)
            
            
            return
        }

        const noFavoritos = document.createElement('p');
        noFavoritos.classList.add('fs-4', 'text-center', 'mt-5');
        noFavoritos.textContent = 'No hay favoritos aun'
        console.log(noFavoritos)

        favoritosDiv.appendChild(noFavoritos); 
    }
}


document.addEventListener('DOMContentLoaded', iniciarApp);