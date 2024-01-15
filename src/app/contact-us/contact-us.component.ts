import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
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
      nombre: "Aakriti",
      imagen: "assets/img/aakritiAvatar.png",
      cargo: "CEO",
      especialidad: "Front-End"
    }
  ]
  socialMedias = [
    {
      red: "IG",
      link: [{text:"@studio_vila", url:"https://www.instagram.com/"}]
    },
    {
      red: "Gmail",
      link: [{text:"studiovila@gmail.com", url:"https://www.google.com/intl/es/gmail/about/"}]
    }
  ]
}
