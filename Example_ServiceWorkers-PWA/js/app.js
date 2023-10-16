//Verificacion 
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
        .then(registrar => console.log('se instalo correctamente', registrar))
        .catch(error => console.log(error))
}else{
    console.log('ServiceWorker No soportados')
}