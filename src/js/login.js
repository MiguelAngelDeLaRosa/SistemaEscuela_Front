import { AppUserService } from "../../service/appUserService.js";
import { CookieService } from "../../service/cookieService.js";
import { LoginDto } from "../DTO/loginDTO.js";

const scookie = new CookieService();
scookie.deleteCookie("User")
scookie.deleteCookie("token")

iniciarSesion()
registro()

function iniciarSesion(){
    document.getElementById("loginButton").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe
    
        // Aquí puedes agregar tu lógica de autenticación
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username != "" || password != ""){
            verificarUsuario(username, password);
        } else {
            document.getElementById("errorMessage").style.display = "block";
        }
    });
}

function registro(){
    document.getElementById("registerButton").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe
    
        window.location.href = "../html/register.html"
    });
}

async function verificarUsuario(username, password){
    const userService = new AppUserService();
    const galleta = new CookieService();
    const user = new LoginDto(username, password);
    
    const verificar = await userService.login(user);

    if (verificar) {
        galleta.setCookie("User", verificar.user.username, 1);
        galleta.setCookie(galleta.getCookie("User"), verificar.token, 1);
        if (verificar.user.role === "client"){
            // Direccionar a pagina de cliente
            window.location.href = "../html/appPadre.html"
        }
        if (verificar.user.role === "teacher"){
            // Direccionar a pagina de maestro
            window.location.href = "../html/maestro.html"
        }
        if (verificar.user.role === "admin"){
            // Direccionar a pagina de admin
            window.location.href = "../html/admin.html"
        }
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}