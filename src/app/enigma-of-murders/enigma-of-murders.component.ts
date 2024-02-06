import { Component } from '@angular/core';

@Component({
  selector: 'app-enigma-of-murders',
  templateUrl: './enigma-of-murders.component.html',
  styleUrl: './enigma-of-murders.component.css'
})
export class EnigmaOfMurdersComponent {
  close() {
    let close = document.getElementById('divEofM');
    if (close) {
      close.style.display = 'none';
    }
  }
}
