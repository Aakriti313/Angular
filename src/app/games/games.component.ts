import { Component } from '@angular/core';
import { IsLogued } from '../services/logued.service';

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
  
  constructor(private logued : IsLogued) { }
  
  filteredGames = this.games;
  searchInput: any;

  search(term: string) {
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(term.toLowerCase())
    );
  }

  isLogged(){
    this.isLogued = this.logued.setIsLogued(true);
  }
  
  

}
