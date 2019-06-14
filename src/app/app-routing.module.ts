import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './componentes/generales/menu/navbar/navbar.component';
import { InicioSesionComponent } from './componentes/generales/usuario/inicio-sesion/inicio-sesion.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {path: '', component: InicioSesionComponent },
  {path: 'iniciosesion', component: InicioSesionComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
