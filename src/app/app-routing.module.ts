import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos los componentes por los que vamos a navegar
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsComponent } from './forms/forms.component';
import { ProfileComponent } from './profile/profile.component';

//Editamos la constante routes del tipo Routes con todas las rutas de la App
const routes:Routes=[
  { path: 'app-root', component: AppComponent},
  { path: 'app-about-us', component: AboutUsComponent},
  { path: 'app-contact-us', component: ContactUsComponent},
  { path: 'app-forms', component: FormsComponent},
  { path: 'app-profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
