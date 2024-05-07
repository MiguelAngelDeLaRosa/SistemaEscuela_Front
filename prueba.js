import { ServicioTarea } from "./service/tareaService.js"

const service = new ServicioTarea()

const tarea = {
    titulo: "Tarea5",
    materia: "Ingles",
    completada: false
}
const aux = await service.eliminarTarea(4)
console.log(aux)