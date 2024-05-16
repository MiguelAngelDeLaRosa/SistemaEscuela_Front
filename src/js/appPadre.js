import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
import { RabbitService } from "../../service/rabbitMqService.js";
import { Notificacion } from "../DTO/notificacion.js";
import { AppUserService } from "../../service/appUserService.js";
var galleta = new CookieService();
var appUser = new AppUserService();

inicio();

function inicio() {
    if (galleta.getCookie("User") != null) {
        async function llenarTabla() {
            const tablaBody = document.querySelector('table tbody');

            tablaBody.innerHTML = '';

            const service = new ServicioTarea();
            const tareas = await service.obtenerTareas(galleta.getCookie(galleta.getCookie("User")));

            tareas.forEach(dato => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${dato.id}</td>
                    <td>${dato.titulo}</td>
                    <td>${dato.materia}</td>
                    <td>${dato.completada}</td>
                    <td><input type="submit" value="Completar" class="boton-accion"></td>
                `;
                tablaBody.appendChild(fila);
            });

            tablaBody.addEventListener('click', (event) => {
                const boton = event.target.closest('.boton-accion');
                if (boton) {
                    const fila = boton.closest('tr');

                    const id = fila.querySelector('td:nth-child(1)').textContent;
                    const titulo = fila.querySelector('td:nth-child(2)').textContent;
                    const materia = fila.querySelector('td:nth-child(3)').textContent;
                    const completada = fila.querySelector('td:nth-child(4)').textContent;

                    console.log(completada);
                    completarTarea(id, titulo, materia, completada);
                }
            })
        }

        async function completarTarea(id, titulo, materia, completada) {
            const rabbit = new RabbitService();
            const contenido = {
                id: id,
                titulo: titulo,
                materia: materia,
                completada: completada
            }
            if (completada === true) {
                alert('Esta tara ya esta completada');
            } else {
                const notificacion = new Notificacion("Tarea verificada y completada por el padre", "AppPadres", "ValidarTareas", contenido);
                console.log(notificacion);
                await rabbit.enviarNotificacion(notificacion, galleta.getCookie(galleta.getCookie("User")));
                alert("Notificacion enviada para validar la tarea")
            }
        }

        document.addEventListener('DOMContentLoaded', llenarTabla);
    }
}