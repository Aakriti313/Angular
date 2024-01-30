import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit{
  // SCROLL
  constructor(private el:ElementRef){}
  scrollToView(){
    this.el.nativeElement.scrollIntoView({  behavior: "smooth", block: "start", inline: "nearest"});
  }
  ngOnInit(): void {
    this.scrollToView();
  }

  
}
