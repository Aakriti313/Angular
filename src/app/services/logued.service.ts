import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsLogued {

  private isLogued: boolean = false;
  private userType: string = '';

  constructor() { }

  // Método para obtener el estado de inicio de sesión
  getIsLogued(): boolean {
    return this.isLogued;
  }

  // Método para establecer el estado de inicio de sesión
  setIsLogued(value: boolean) {
    this.isLogued = value;
  }

  getUserType(): string {
    return this.userType;
  }

  setUserType(type: string){
    return this.userType = type;
  }

  
}