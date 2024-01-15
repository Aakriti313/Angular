import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importamos los componentes por los que vamos a navegar
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

//Editamos la constante routes del tipo Routes con todas las rutas de la App
const routes:Routes=[
  {path:'app-menu',title:'titulo',component:HeaderComponent},
  {path:'app-footer',title:'titulo',component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
