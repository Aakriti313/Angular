import { Component, OnInit } from '@angular/core';
import { IsLogued } from './services/logued.service';
import { Engine } from '../assets/js/mapa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[Engine]
})
export class AppComponent implements OnInit {
  copyright = '@copyright Studio VILA';
  title = '';
  userType: string = '';
  selectedImage: string | null = '';
  username: string | null = '';

  constructor(private formsComponent: IsLogued,
    private en:Engine
  ) {
    
  }
  
  ngOnInit(): void {
    // this.en.init();
  }

  // Método para verificar si el usuario está logueado
  isLogued(): boolean {
      // Recupera los datos del usuario del localStorage
      const currentUserString = localStorage.getItem("currentUser");
      if (currentUserString) {
          const currentUser = JSON.parse(currentUserString);
          this.selectedImage = localStorage.getItem('selectedImage_' + currentUser.nickname_user);
          this.username = currentUser.nickname_user; // Asigna el nombre de usuario
      }
    return this.formsComponent.getIsLogued();
  }

  isAdmin(): boolean {
    return this.formsComponent.getUserType() === 'admin';
  }


}