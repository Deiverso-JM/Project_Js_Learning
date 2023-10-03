export function mostraAlerta(mensaje) {
    const alertA= document.querySelector('.bg-red-100');
    if(!alertA){
        const alertA = document.createElement('p');
        alertA.classList.add('bg-red-100', 'border-red-400', 'rounded', 'px-4', 'py-3'
        ,'text-red-400', 'max-w-lg', 'mx-auto', 'text-center', 'mt-6');

        alertA.innerHTML = `
            <strong class="font-bold"> Error!</strong>
            <span class="block sm:inline" >${mensaje}</span>
        `;

        const formulario = document.querySelector('#formulario');
        formulario.appendChild(alertA);

        setTimeout(() => {
            alertA.remove()
        }, 3000);
    }
    
}

export function validar(Cliente) {
    return (!Object.values(Cliente).every(input => input !== ''));
}
