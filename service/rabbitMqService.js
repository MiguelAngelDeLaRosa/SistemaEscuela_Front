const PORT = 8080
const URL_RABBIT = "/api/v1"
const URL_NOTIFICACIONES = "/notificar"
const URL_MENSAJES = "/mensaje"

export class RabbitService {
    constructor(){
        this.urlNotificaciones = 'http://localhost:' + PORT + URL_RABBIT + URL_NOTIFICACIONES;
        this.urlMensajes = 'http://localhost:' + PORT + URL_RABBIT + URL_MENSAJES;
    }

    async enviarNotificacion(notificacion, token) {
        try {
            const response = await fetch(this.urlNotificaciones, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(notificacion)
            })
            let json = await response.json();
            return json;
        } catch (error) {
            console.log('Error al enviar notificacion: ', error);
            return null;
        }
    }

    async listarNotificaciones(token){
        try {
            const response = await fetch('http://localhost:' + PORT + URL_RABBIT + '/notificaciones', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            let json = await response.json();
            return json;
        } catch (error) {
            console.log('Error al obtener notificaciones: ', error);
            return null;
        }
    }

    async enviarMensaje(mensaje, token) {
        try {
            const response = await fetch(this.urlMensajes, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(mensaje)
            })
            let json = await response.json();
            return json;
        } catch (error) {
            console.log('Error al enviar mensaje: ', error);
            return null;
        }
    }

    async listarMensajes(token){
        try {
            const response = await fetch('http://localhost:' + PORT + URL_RABBIT + '/mensajes', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            let json = await response.json();
            return json;
        } catch (error) {
            console.log('Error al obtener mensajes: ', error);
            return null;
        }
    }
}