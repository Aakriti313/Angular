import { Component, ElementRef, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit{
  //Scroll
  constructor(private el:ElementRef, private themeService: ThemeService){}

  scrollToView(){
    this.el.nativeElement.scrollIntoView({  behavior: "smooth", block: "start", inline: "nearest"});
  }

  isDarkMode: boolean = false;
  
  ngOnInit(): void {
    this.scrollToView();
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  

}
