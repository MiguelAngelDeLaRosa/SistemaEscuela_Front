import { RabbitService } from "../../service/rabbitMqService.js";
import { CookieService } from "../../service/cookieService.js";
import { Mensaje } from "../DTO/mensaje.js";

const galleta = new CookieService();
const rabbit = new RabbitService();

function enviarMensaje() {
    document.getElementById('btnEnviar').addEventListener('click', async (event) => {
        const txtMensaje = document.getElementById('mensajeInput').value;
        const remitente = "Docente: " + galleta.getCookie("User");
        const mensaje = new Mensaje(txtMensaje, remitente, "Padre");
        await rabbit.enviarMensaje(mensaje, galleta.getCookie(galleta.getCookie("User")));
    })
}

async function obtenerMensajes() {
    var nMensajes = 0;
    while(true) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mensajes = await rabbit.listarMensajes(galleta.getCookie(galleta.getCookie("User")));

        if (mensajes.length > nMensajes) {
            mostrarMensajes(mensajes)
            nMensajes = mensajes.length;
        }
    }
}

function mostrarMensajes(mensajes) {
    const chatMessages = document.querySelector(".chat-messages")
    chatMessages.innerHTML = '';
    for (const msj of mensajes) {
        const msjHeader = document.createElement('h4');
        const mensajeElemento = document.createElement('div');
        msjHeader.textContent = msj.remitente;
        mensajeElemento.textContent = msj.mensaje;
        chatMessages.appendChild(msjHeader);
        chatMessages.appendChild(mensajeElemento);
    }

}

obtenerMensajes();
enviarMensaje();