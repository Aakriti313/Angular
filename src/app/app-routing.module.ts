import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos los componentes por los que vamos a navegar
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsComponent } from './forms/forms.component';
import { ProfileComponent } from './profile/profile.component';
import { EnigmaOfMurdersComponent } from './enigma-of-murders/enigma-of-murders.component';
import { GamesComponent } from './games/games.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

//Editamos la constante routes del tipo Routes con todas las rutas de la App
const routes:Routes=[
  { path: '', redirectTo: '/app-games', pathMatch: 'full' },
  { path: 'app-root', component: AppComponent},
  { path: 'app-about-us', component: AboutUsComponent},
  { path: 'app-contact-us', component: ContactUsComponent},
  { path: 'app-forms', component: FormsComponent},
  { path: 'app-profile', component: ProfileComponent},
  { path: 'app-enigma-of-murders', component: EnigmaOfMurdersComponent},
  { path: 'app-games', component: GamesComponent},
  { path: 'app-admin-page', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
