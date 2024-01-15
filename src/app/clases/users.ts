export class User {

    private static nextId: number = 1;

    id: number = 0;
    nombre_completo: string = "";
    email: string = "";
    recovery_email: string = "";
    imagen: URL | string = "";

    constructor(nombre_completo: string, email: string, recovery_email: string, imagen: URL | string) {
        this.id = User.nextId++;
        this.nombre_completo = nombre_completo;
        this.email = email;
        this.recovery_email = recovery_email;
        this.imagen = imagen;
    }
}
