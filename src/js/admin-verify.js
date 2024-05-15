import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
import { RabbitService } from "../../service/rabbitMqService.js";
import { Tarea } from "../DTO/tareaDTO.js"

const galleta = new CookieService();
const tareaService = new ServicioTarea();

async function getNotificaciones() {
    const tablaBody = document.querySelector('table tbody');

    tablaBody.innerHTML = '';

    const rabbit = new RabbitService();
    const notis = await rabbit.listarNotificaciones(galleta.getCookie(galleta.getCookie("User")));
    const ultimas10 = notis.slice(-10);

    var tareas;

    ultimas10.forEach(async (element) => {
        const tarea = await tareaService.obtenerTareaPorId(element.idTarea, galleta.getCookie(galleta.getCookie("User")))
        tareas.push(tarea);
    });

    tareas.forEach(dato => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${dato.id}</td>
            <td>${dato.titulo}</td>
            <td>${dato.materia}</td>
            <td>${dato.completada}</td>
            <td><input type="submit" value="Validar" class="boton-accion"></td>
        `;
        tablaBody.appendChild(fila);
    });
}

function updateEstado() {

}

getNotificaciones();