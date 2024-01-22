export class User {

    private static nextId: number = 1;

    id: number = 0;
    nombre: string = "";
    apellido: string = "";
    nickname: string = "";
    edad: number = 0;
    email: string = "";
    telefono: number = 0;
    password: string = "";
    //imagen opcional
    imagen?: URL | string = "";

    constructor(nombre: string, apellido: string, nickname: string, edad: number, email: string, telefono: number, password: string, imagen?: URL | string) {
        this.id = User.nextId++;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nickname = nickname;
        this.edad = edad;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
        this.imagen = imagen;
    }
}
