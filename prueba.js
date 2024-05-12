import { ServicioTarea } from "./service/tareaService.js"
import { AppUserService } from "./service/appUserService.js"
import { CookieService } from "./service/cookieService.js"

const service = new ServicioTarea()
const userService = new AppUserService()
const cookie = new CookieService()

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

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaXN0ZW1hIEVzY3VlbGEgQVBJIiwic3ViIjoiQW5nZWwyMyIsInJvbGUiOiJjbGllbnQiLCJleHAiOjE3MTU1NjA3MjUsImlhdCI6MTcxNTQ3NDMyNX0.bhZIcRAk74psaSftXZj8MYXy09VTjPQWreScgT6rZX4'

const aux = await service.obtenerTareas(token)
//const aux2 = await userService.obtenerPerfil(token)
//const aux3 = cookie.setCookie("Angel23", token, 1)

console.log(aux)