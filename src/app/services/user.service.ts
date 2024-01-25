import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../clases/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  //Creamos una instancia que recoje el usuario actual, este será o tipo user o null.
  private currentUser = new BehaviorSubject<User | null>(null);
  //convertimos el usuario en observable para que tanto los componentes com olos servicios puedan hacer cambios en este usuario(el $ indica que es un observable).
  currentUser$ = this.currentUser.asObservable();

  constructor() {}

  //Validación de los usuarios. Busca dentro del array de users al usuario actual y su contraseña.
  logInValidation(nickname_user: string, password_user: string): boolean {
    let user = this.users.find(
      (u) => u.nickname_user === nickname_user && u.password === password_user
    );

    //Si encuentra al usuario lo actualiza a través de BehaviorSubject.
    if (user) {
      this.currentUser.next(user);
      return true;
    } else {
      return false;
    }
  }
}
