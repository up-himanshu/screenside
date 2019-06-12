import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InicioSesionComponent } from './componentes/generales/usuario/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './componentes/generales/usuario/registro/registro.component';
import { MenuComponent } from './componentes/generales/menu/menu/menu.component';
import { JuegoComponent } from './componentes/generales/menu/juego/juego.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegistroComponent,
    MenuComponent,
    JuegoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
