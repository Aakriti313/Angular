export class User {

    private static nextId: number = 1;

    id: number = 0;
    nombre_completo: string = "";
    email: string = "";
    email_recuperacion: string = "";
    imagen: URL | string = "";

    constructor(nombre_completo: string, email: string, email_recuperacion: string, imagen: URL | string) {
        this.id = User.nextId++;
        this.nombre_completo = nombre_completo;
        this.email = email;
        this.email_recuperacion = email_recuperacion;
        this.imagen = imagen;
    }
}
