import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos los componentes por los que vamos a navegar
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsComponent } from './forms/forms.component';

//Editamos la constante routes del tipo Routes con todas las rutas de la App
const routes:Routes=[
  { path: 'app-about-us', component: AboutUsComponent},
  { path: 'app-contact-us', component: ContactUsComponent},
  { path: 'app-forms', component: FormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
