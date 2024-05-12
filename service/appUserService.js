export class AppUserService {
    #urlUsuario = 'http://localhost:'+process.env.PORT + process.env.URL_APP_USER

    async register(registro){
        try {
            const response = await fetch(this.#urlUsuario + '/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registro)
            })
            let json = await response.json();
            return json
        } catch (error) {
            console.log('Error al registrar usuario: ', error);
            return null;
        }
    }

    async login(user) {
        try {
            const response = await fetch(this.#urlUsuario + '/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            let json = await response.json()
            return json
        } catch (error) {
            console.log('Error al iniciar sesion: ', error);
            return null;
        }
    }

    async obtenerPerfil(token){
        try {
            const response = await fetch(this.#urlUsuario + '/profile', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            let json = await response.json()
            return json
        } catch (error) {
            console.log('Error al obtener perfil: ', error);
            return null;
        }
    }
}