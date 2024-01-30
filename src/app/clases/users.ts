export class User {

    private static nextId: number = 1;

    id_user: number = 0;
    name_user: string = "";
    surname_user: string = "";
    nickname_user: string = "";
    age_user: number = 0;
    email_user: string = "";
    phone_user: number = 0;
    password: string = "";
    //imagen opcional
    image_user?: Blob;

    constructor(name_user: string="", surname_user: string="", nickname_user: string="", age_user: number=0, email_user: string="", phone_user: number=0, password: string="", image_user?: Blob) {
        this.id_user = User.nextId++;
        this.name_user = name_user;
        this.surname_user = surname_user;
        this.nickname_user = nickname_user;
        this.age_user = age_user;
        this.email_user = email_user;
        this.phone_user = phone_user;
        this.password = password;
        this.image_user = image_user;
    }
}
