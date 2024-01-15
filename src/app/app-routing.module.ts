import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos los componentes por los que vamos a navegar
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

//Editamos la constante routes del tipo Routes con todas las rutas de la App
const routes:Routes=[
  { path: 'app-menu', title:'titulo', component: HeaderComponent},
  { path: 'app-footer', title:'titulo', component: FooterComponent},
  { path: 'app-about-us', component: AboutUsComponent},
  { path: 'app-contact-us', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
