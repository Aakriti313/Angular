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

  constructor(private formsComponent: IsLogued,private en:Engine) {}
  ngOnInit(): void {
    //this.en.init();
  }

  // Método para verificar si el usuario está logueado
  isLogued(): boolean {
    return this.formsComponent.getIsLogued();
  }

  isAdmin(): boolean {
    return this.formsComponent.getUserType() === 'admin';
  }


}