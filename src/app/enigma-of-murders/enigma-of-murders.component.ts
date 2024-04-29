import { Component, OnInit } from '@angular/core';
import { Engine } from '../../assets/js/mapa';

@Component({
  selector: 'app-enigma-of-murders',
  templateUrl: './enigma-of-murders.component.html',
  styleUrl: './enigma-of-murders.component.css',
  providers:[Engine]
})
export class EnigmaOfMurdersComponent implements OnInit {

  constructor(private en:Engine) {}
  ngOnInit(): void {
    this.en.init();
  }

  close() {
    let close = document.getElementById('divEofM');
    if (close) {
      close.style.display = 'none';
    }
  }
}
