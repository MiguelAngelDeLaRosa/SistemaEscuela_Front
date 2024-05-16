import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
import { RabbitService } from "../../service/rabbitMqService.js";
import { Tarea } from "../DTO/tareaDTO.js"

const galleta = new CookieService();
const tareaService = new ServicioTarea();

async function getNotificaciones() {
    const rabbit = new RabbitService();
    const notis = await rabbit.listarNotificaciones(galleta.getCookie(galleta.getCookie("User")));
    const ultimas10 = notis.slice(-10);
    console.log(ultimas10)
    var tareas = [];

    for (const element of ultimas10) {
        if (element.remitente === "AppPadres") {
            const tarea = await tareaService.obtenerTareaPorId(element.idTarea, galleta.getCookie(galleta.getCookie("User")))
            tareas.push(tarea);
        }
    }

    listarTareas(tareas);
}

function listarTareas(tareas) {
    const tablaBody = document.querySelector('table tbody');

    tablaBody.innerHTML = '';

    tareas.forEach(dato => {
        if (dato.completada != true) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${dato.id}</td>
            <td>${dato.titulo}</td>
            <td>${dato.materia}</td>
            <td>${dato.completada}</td>
            <td><input type="submit" value="Validar" class="boton-accion"></td>
        `;
            tablaBody.appendChild(fila);
        }
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
            updateEstado(id, titulo, materia, completada);
        }
    })
}

async function updateEstado(id, titulo, materia, completada) {
    completada = true
    const tarea = new Tarea(titulo, materia, completada);
    const nuevaTarea = await tareaService.actualizarTarea(tarea, id, galleta.getCookie(galleta.getCookie("User")))
}

getNotificaciones();