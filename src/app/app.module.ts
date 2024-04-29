import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from'@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsComponent } from './forms/forms.component';
import { EnigmaOfMurdersComponent } from './enigma-of-murders/enigma-of-murders.component';
import { ProfileComponent } from './profile/profile.component';
import { Engine } from '../assets/js/mapa';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactUsComponent,
    FormsComponent,
    EnigmaOfMurdersComponent,
    ProfileComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Engine],
  bootstrap: [AppComponent]
})
export class AppModule {}