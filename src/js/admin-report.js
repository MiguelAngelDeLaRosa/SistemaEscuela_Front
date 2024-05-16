import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.3/jspdf.umd.min.js";
import { Tarea } from "../DTO/tareaDTO.js"

const tareaService = new ServicioTarea();
const galleta = new CookieService();
const doc = new jsPDF();

function generarReporte(){
    document.getElementById('btnReporte').addEventListener('click', async (event) => {
        const tareas = await tareaService.obtenerTareas(galleta.getCookie(galleta.getCookie("User")));

        let y = 10;

        tareas.forEach(dato => {
            doc.text(`ID: ${dato.id}`, 10, y);
            doc.text(`Titulo: ${dato.titulo}`, 10, y + 10);
            doc.text(`Matería: ${dato.materia}`, 10, y + 10);
            doc.text(`Completada: ${dato.completada}`, 10, y + 10);

            y += 20;
        });

        doc.save("reporte.pdf")
    })
}

async function completadas(){
    const span = document.querySelector('.value');
    const tareas = await tareaService.obtenerTareas();
    var completadas = 0;

    tareas.forEach(tarea => {
        if (tarea.completada === true){
            completadas += 1;
        }
    })

    span.textContent = `${completadas}/${tareas.length}`;
}

generarReporte();
completadas();
