export class RegisterDto {
    constructor(firstName, lastName, username, email, phone, address, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
    }
}