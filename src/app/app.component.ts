import { Component, OnInit } from '@angular/core';
import { IsLogued } from './services/logued.service';
import { Engine } from '../assets/js/mapa';
import { ImageService } from './services/image.service';

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
  selectedImage: string | null = null;

  constructor(private formsComponent: IsLogued,
    private en:Engine,
    private imageService: ImageService
  ) {}
  
  ngOnInit(): void {
    //this.en.init();
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    this.selectedImage = localStorage.getItem('selectedImage_' + currentUser.nickname_user);
  }

  // Método para verificar si el usuario está logueado
  isLogued(): boolean {
    return this.formsComponent.getIsLogued();
  }

  isAdmin(): boolean {
    return this.formsComponent.getUserType() === 'admin';
  }


}