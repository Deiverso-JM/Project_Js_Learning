



class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCitas(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter((cita) => cita.id !== id);
    }


    editarCita(citaactualizada){

        this.citas = this.citas.map(cita => cita.id === citaactualizada.id ? citaactualizada : cita)

    }
}


export default Citas;