import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
import { RabbitService } from "../../service/rabbitMqService.js";
import { Notificacion } from "../DTO/notificacion.js";
var galleta = new CookieService();

inicio();

function inicio() {
    if (galleta.getCookie("User") != null) {
        console.log(galleta.getCookie("User"))
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

                    console.log(id);
                    completarTarea(id, titulo, materia, completada);
                }
            })
        }

        async function completarTarea(id, titulo, materia, completada) {
            const rabbit = new RabbitService();
            completada = true;
            const contenido = {
                id: id,
                titulo: titulo,
                materia: materia,
                completada: completada
            }
            const notificacion = new Notificacion("Tarea verificada y completada por el padre", "AppPadre", "ValidarTareas", contenido);
            console.log(notificacion);
            await rabbit.enviarNotificacion(notificacion, galleta.getCookie(galleta.getCookie("User")));
        }

        document.addEventListener('DOMContentLoaded', llenarTabla);
    }
}