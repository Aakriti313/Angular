import { Component, OnInit, Renderer2 } from '@angular/core';
import { IsLogued } from './services/logued.service';
import { Engine } from '../assets/js/mapa';
import { ThemeService } from './services/theme.service';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Engine]
})
export class AppComponent implements OnInit {
  copyright = '@copyright Studio VILA';
  title = '';
  userType: string = '';
  selectedImage: string | null = '';
  username: string | null = '';
  isDarkMode: boolean = false;

  constructor(
    private imageService: ImageService,
    private formsComponent: IsLogued, 
    private en: Engine, 
    private themeService: ThemeService, 
    private renderer: Renderer2
  ) {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
      if (isDarkMode) {
        this.renderer.addClass(document.body, 'dark-mode');
        this.renderer.removeClass(document.body, 'light-mode');
      } else {
        this.renderer.addClass(document.body, 'light-mode');
        this.renderer.removeClass(document.body, 'dark-mode');
      }
    });
  }

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });

    const storedImage = this.imageService.getSelectedImage();
    if (storedImage) {
      this.selectedImage = storedImage;
    }
  }

  isLogued(): boolean {
  const currentUserString = localStorage.getItem("currentUser");
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    this.username = currentUser.nickname_user;
  }
    this.selectedImage = this.imageService.getSelectedImage();
    
    return this.formsComponent.getIsLogued();
  }

  isAdmin(): boolean {
    return this.formsComponent.getUserType() === 'admin';
  }
}
