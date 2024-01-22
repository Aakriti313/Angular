import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  title = 'Enigma Of Murders';
  ceosInfo = [
    {
      nombre: "Laura Ortiz",
      imagen: "assets/img/lauraAvatar.png",
      cargo: "CEO",
      especialidad: "Front-End"
    },
    {
      nombre: "Isabel Arellano",
      imagen: "assets/img/valeryAvatar.png",
      cargo: "CEO",
      especialidad: "Back-End"
    },
    {
      nombre: "Valery Rodriguez",
      imagen: "assets/img/isabelAvatar.png",
      cargo: "CEO",
      especialidad: "Back-End"
    },
    {
      nombre: "Aakriti Guerrero",
      imagen: "assets/img/aakritiAvatar.png",
      cargo: "CEO",
      especialidad: "Front-End"
    }
  ]
  socialMedias = [
    {
      red: "IG",
      link: [{text:"@studio_vila", url:"https://www.instagram.com/studio_vila?igsh=ZndsOXl5ZzBkM3Z6"}]
    },
    {
      red: "Gmail",
      link: [{text:"studioovila@gmail.com", url:"mailto:studioovila@gmail.com"}]
    }
  ]
}
