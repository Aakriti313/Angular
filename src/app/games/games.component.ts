import { Component } from '@angular/core';
import { IsLogued } from '../services/logued.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  
  isLogued : any;
  
  games = [
    { title: 'Enigma Of Murders', image: '../../assets/img/IntroEnigmaOfMurders.png' },
    { title: 'Proximamente...', image: '../../assets/img/comingsoon.png'},
    { title: 'Proximamente...', image: '../../assets/img/comingsoon.png'}
  ];
  
  constructor(private logued : IsLogued, private themeService: ThemeService) { 

    this.isLogued = this.logued.getIsLogued();


  }
  
  filteredGames = this.games;
  searchInput: any;

  search(term: string) {
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  isDarkMode: boolean = false;

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

}
