import { CookieService } from "./cookieService.js";
const PORT = 8080;
const URL_TAREA = "/api/v1/tareas"

export class ServicioTarea {

    constructor() {
        this.urlTarea = 'http://localhost:' + PORT + URL_TAREA
        this.cookie = new CookieService();
    }

    async crearTarea(tarea, token) {
        try {
            let response = await fetch(this.urlTarea, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tarea)
            })
            let json;
            if (response.ok) {
                json = await response.json();
            } else {
                throw new Error('La solicitud falló con estado ' + response.status);
            }
            return json;
        } catch (error) {
            console.log('Error al crear tarea: ', error);
            return null;
        }
    }

    async actualizarTarea(tarea, id, token) {
        try {
            let response = await fetch(this.urlTarea + "/editar/" + id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
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

    async eliminarTarea(id, token) {
        try {
            await fetch(this.urlTarea + "/eliminar/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
        } catch (error) {
            console.log('Error al eliminar tarea: ', error);
            return null;
        }
    }

    async obtenerTareas(token) {
        try {
            let response = await fetch(this.urlTarea, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            });
            let json = await response.json()
            return json;
        } catch (error) {
            console.log('Error al consultar las tareas: ', error);
            return null;
        }
    }

    async obtenerTareaPorId(id, token) {
        try {
            let response = await fetch(this.urlTarea + "/obtener/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            });
            let json = await response.json()
            return json;
        } catch (error) {
            console.log('Error al consultar tarea por id: ', error);
            return null;
        }
    }
}