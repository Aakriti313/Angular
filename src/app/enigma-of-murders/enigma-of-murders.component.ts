import { Component, OnInit } from '@angular/core';
import { Engine } from '../../assets/js/mapa';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-enigma-of-murders',
  templateUrl: './enigma-of-murders.component.html',
  styleUrl: './enigma-of-murders.component.css',
  providers:[Engine]
})
export class EnigmaOfMurdersComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private en:Engine, private themeService: ThemeService) {}
  
  ngOnInit(): void {
    this.en.init();
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  close() {
    let close = document.getElementById('divEofM');
    if (close) {
      close.style.display = 'none';
    }
  }

}
