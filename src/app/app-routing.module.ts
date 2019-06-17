import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/generales/usuario/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './componentes/generales/usuario/registro/registro.component';
import { JuegoComponent } from './componentes/generales/menu/juego/juego.component';
import { PuntuajeComponent } from './componentes/generales/menu/puntuaje/puntuaje.component';

const appRoutes: Routes = [
  {path: '', component: InicioSesionComponent },
  {path: 'registro', component: RegistroComponent},
  {path: 'puntuaje', component: PuntuajeComponent},
  {path: 'juego', component: JuegoComponent},
  { path: '**', redirectTo: '' }
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
