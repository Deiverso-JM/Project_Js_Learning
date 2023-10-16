const url = `http://localhost:5500/clientes`

//Cuando se crea nuevos clientes
export const nuevoCliente = async cliente => {
    console.log(cliente);
    try {
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error)
    }
}


export const obtenerClientes = async ()=>{
    try {
        const resultado = await fetch(url)
        const clientes = await resultado.json()
        return clientes;
    } catch (error) {
        console.log(error)
    }
}


export const eliminarCliente = async id =>{
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error)
    }
}


export const obtenerCliente = async id =>{
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        return cliente
    } catch (error) {
        console.log(error)
    }
}


export const actualizarCliente = cliente =>{
    try {
        fetch(`${url}/${cliente.id}`,{
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
        
    } catch (error) {
        console.log(error)
    }
}