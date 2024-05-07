import dotenv from 'dotenv';

dotenv.config()

export class ServicioTarea {
    
    constructor() {
        this.urlTarea = 'http://localhost:'+process.env.PORT + process.env.URL_TAREA
    }

    async crearTarea(tarea){
        try {
            let response = await fetch(this.urlTarea, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarea)
            });
            let json = await response.json();
            return json;
        } catch (error) {
            console.log('Error al crear tarea: ', error);
            return null;
        }
    }

    async actualizarTarea(tarea, id){
        try {
            let response = await fetch(this.urlTarea+"/editar/"+id , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarea)
            })
            let json = await response.json();
            return json;
        } catch (error) {
            console.log('Error al actualizar tarea: ', error);
            return null;
        }
    }

    async eliminarTarea(id){
        try {
            await fetch(this.urlTarea+"/eliminar/"+id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        } catch (error) {
            console.log('Error al eliminar tarea: ', error);
            return null;
        }
    }

    async obtenerTareas(){
        try {
            let response = await fetch(this.urlTarea);
            let json = await response.json()
            return json;
        } catch (error) {
            console.log('Error al consultar las tareas: ', error);
            return null;
        }
    }

    async obtenerTareaPorId(id){
        try {
            let response = await fetch(this.urlTarea+"/obtener/"+id);
            let json = await response.json()
            return json;
        } catch (error) {
            console.log('Error al consultar tarea por id: ', error);
            return null;
        }
    }
}