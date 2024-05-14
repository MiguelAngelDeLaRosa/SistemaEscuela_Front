import { ServicioTarea } from "../../service/tareaService.js";
import { CookieService } from "../../service/cookieService.js";
var galleta = new CookieService();

inicio();

function inicio(){
    if (galleta.getCookie("User") != null){
        console.log(galleta.getCookie("User"))
        async function llenarTabla(){
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
                `;
                tablaBody.appendChild(fila);
            });
        }
        
        document.addEventListener('DOMContentLoaded', llenarTabla);       
    }
}