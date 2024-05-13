import { AppUserService } from "../../service/appUserService.js";
import { RegisterDto } from "../DTO/registerDTO.js";

registroUsuario();
volverInicio();

function registroUsuario(){
    document.getElementById("registerButton").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        const registroDTO = new RegisterDto(firstName, lastName, username, email, phone, address, password)
    
        signIn(registroDTO);
    });
}

function volverInicio(){
    document.getElementById("loginButton").addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        window.location.href = "../html/login.html"
    });
}

async function signIn(registroDTO){
    const appUser = new AppUserService();

    const registro = await appUser.register(registroDTO);

    if (registro){
        alert(`Se ha registrado exitosamente ${registro.user.username}`);
        window.location.href = "../html/login.html"
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
}