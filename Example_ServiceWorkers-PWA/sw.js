//Variables
const nombreCache = 'apv-1';
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js',
];

//Eventos 
//Instalacion
self.addEventListener('install', e =>{
    console.log("Instalado el service Worker")
    
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('cacheando...')
                cache.addAll(archivos);
            })
    )
})

//activar service worker

self.addEventListener('activate', e =>{
    console.log("Se activo SW");
    console.log(e)

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache).map(key=> cache.delete(key)) //Filtra y borra las demas versiones
                )
            })
    )
})


//Evento Fetch para descargar archivos estaticos

self.addEventListener('fetch', e => {
    console.log("Fetch....")

    e.respondWith(
        caches.match(e.request)
            .then( respuestaCache =>{
                return respuestaCache  ? respuestaCache: caches.match('/error.html')
            })
    )
})
