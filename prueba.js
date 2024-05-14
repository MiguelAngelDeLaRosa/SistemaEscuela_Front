import { ServicioTarea } from "./service/tareaService.js"
import { AppUserService } from "./service/appUserService.js"
import { CookieService } from "./service/cookieService.js"
import { RabbitService } from "./service/rabbitMqService.js"

const service = new ServicioTarea()
const userService = new AppUserService()
const cookie = new CookieService()
const rabbit = new RabbitService()

const tarea = {
    titulo: "Tarea5",
    materia: "Ingles",
    completada: true
}

const user = {
    firstName: "Angel",
    lastName: "Martinez",
    password: "1234567",
    email: "angel@gmail.com",
    username: "Angel23"
}

const userLogin = {
    username: "Angel23",
    password: "1234567"
}

const notificacion = {
    mensaje: "Tarea verficada por el padre",
    remitente: "AppPadres",
    destinatario: "ValidarTareas",
    contenido: {
        id: 1,
        titulo: "Tarea2",
        materia: "Ciencias naturales",
        completada: true
    }
}

const mensaje = {
    mensaje: "En junio",
    remitente: "AppMaestros",
    destinatario: "AppPadres"
}

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaXN0ZW1hIEVzY3VlbGEgQVBJIiwic3ViIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MTU3OTMyNTksImlhdCI6MTcxNTcwNjg1OX0.X5hHqGy4CkjB0Xe6nwxZAIEdxQCFI4xWvB0aQlhaHHc'

//const aux = await service.obtenerTareas(token)
//const aux2 = await userService.obtenerPerfil(token)
//const aux3 = cookie.setCookie("Angel23", token, 1)
const aux4 = await rabbit.enviarMensaje(mensaje, token)

console.log(aux4)