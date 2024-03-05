import { Component } from '@angular/core';
import { IsLogued } from './services/logued.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  copyright = '@copyright Studio VILA';
  title = '';

  constructor(private formsComponent: IsLogued) {}

  // Método para verificar si el usuario está logueado
  isLogued(): boolean {
    return this.formsComponent.getIsLogued();
  }
  
}