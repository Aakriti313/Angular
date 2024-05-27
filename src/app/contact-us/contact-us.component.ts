import { Component, ElementRef } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  title = 'Enigma Of Murders';
  ceosInfo = [
    {
      name: "Laura Ortiz",
      image: "assets/img/lauraAvatar.png",
      range: "CEO",
      especiality: "Front-End"
    },
    {
      name: "Isabel Arellano",
      image: "assets/img/valeryAvatar.png",
      range: "CEO",
      especiality: "Back-End"
    },
    {
      name: "Valery Rodriguez",
      image: "assets/img/isabelAvatar.png",
      range: "CEO",
      especiality: "Back-End"
    },
    {
      name: "Aakriti Guerrero",
      image: "assets/img/aakritiAvatar.png",
      range: "CEO",
      especiality: "Front-End"
    }
  ]

  socialMedias = [
    {
      media: "IG",
      link: [{text:"@studio_vila", url:"https://www.instagram.com/studio_vila?igsh=ZndsOXl5ZzBkM3Z6"}]
    },
    {
      media: "Gmail",
      link: [{text:"studioovila@gmail.com", url:"mailto:studioovila@gmail.com"}]
    }
  ]
  
  //Scroll
  constructor(private el:ElementRef, private themeService: ThemeService){}
  ngOnInit(): void {
    this.scrollToView();
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }
  scrollToView(){
    this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
  }

  isDarkMode: boolean = false;
  
}
