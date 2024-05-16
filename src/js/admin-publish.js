import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
import { Tarea } from "../DTO/tareaDTO.js"

publicarTarea();

const galleta = new CookieService();

function publicarTarea(){
    document.getElementById("btnTarea").addEventListener("click", function(event){
        event.preventDefault();

        var titulo = document.getElementById("titulo").value;
        var materia = document.getElementById("materia").value;
        var completada = false;

        const tarea = new Tarea(titulo, materia, completada);

        crearTarea(tarea);
    })
}

async function crearTarea(tarea){
    const serviceTarea = new ServicioTarea();
    const galleta = new CookieService();

    const resultado = await serviceTarea.crearTarea(tarea, galleta.getCookie(galleta.getCookie("User")));

    if (resultado) {
        alert("Se publico la tarea con exito")
        limpiarCampos();
    } else {
        alert("Error al publicar tarea");
    }
}

function limpiarCampos(){
    document.getElementById("titulo").textContent = "";
    document.getElementById("materia").textContent = "";
}