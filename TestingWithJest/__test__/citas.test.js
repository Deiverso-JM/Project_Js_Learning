import Citas from '../js/classes/Citas.js'

describe('Citas testing', () => {
    const citas = new Citas();
    const id = Date.now();
    test('agregar una nueva cita', () => { 
        const citaObj = {
            id,
            mascota: 'Hook',
            propietario: 'Johan',
            telefono: '154564',
            fecha: '10-32-4123',
            hora:'10:30',
            sintomas: 'solo duerme'
        }



        citas.agregarCita(citaObj);

        //Prueba
        expect(citas).toMatchSnapshot();

        
     })

     test('Actualizar Cita', () => { 
        const citaActualizada = {
            id,
            mascota: 'Hook',
            propietario: 'Johan',
            telefono: '154564',
            fecha: '10-32-4123',
            hora:'10:30',
            sintomas: 'solo duerme'
        }


        citas.editarCita(citaActualizada);

        //Prueba
        expect(citas).toMatchSnapshot();

        
     })

     test('Eliminar Cita', () => { 
        const citaEliminada = {
            id,
            mascota: 'Hook',
            propietario: 'Johan',
            telefono: '154564',
            fecha: '10-32-4123',
            hora:'10:30',
            sintomas: 'solo duerme'
        }


        citas.eliminarCita(citaEliminada);

        //Prueba
        expect(citas).toMatchSnapshot();

        
     })
})