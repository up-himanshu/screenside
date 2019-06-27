import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/generales/usuario/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './componentes/generales/usuario/registro/registro.component';
import { JuegoComponent } from './componentes/generales/menu/juego/juego.component';
import { PuntuajeComponent } from './componentes/generales/menu/puntuaje/puntuaje.component';
import { AutentificacionGuard } from './guardianes/credenciales/autentificacion.guard';
import { MenuComponent } from './componentes/generales/menu/menu/menu.component';
import { Role } from './interface/generales/roles';
import { MenujuegoComponent } from './componentes/generales/menu/menujuego/menujuego.component';
import { AdministradorComponent } from './componentes/generales/administrador/administrador.component';

const appRoutes: Routes = [
  {
    path: '', 
    component: InicioSesionComponent,          
  },
  {
    path: 'registro', 
    component: RegistroComponent,    
  },
  {
    path: 'puntuaje', component: PuntuajeComponent,
    canActivate: [AutentificacionGuard],
    data: { roles: [Role.user]}
  },
  {
    path: 'menujugar', component: MenujuegoComponent,
    canActivate: [AutentificacionGuard],
    data: { roles: [Role.user]}
  },
  {
    path: 'jugar', component: JuegoComponent,
    canActivate: [AutentificacionGuard],
    data: { roles: [Role.user]}
  },
  {
    path: 'perfil', component: MenuComponent,
    canActivate: [AutentificacionGuard]    
  },
  {
    path: 'partidas', component: AdministradorComponent,
    canActivate: [AutentificacionGuard]
    //data: { roles: [Role.admin]} 
  },
  { 
    path: '**', redirectTo: '' 
  }
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
