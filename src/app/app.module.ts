import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InicioSesionComponent } from './componentes/generales/usuario/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './componentes/generales/usuario/registro/registro.component';
import { MenuComponent } from './componentes/generales/menu/menu/menu.component';
import { JuegoComponent } from './componentes/generales/menu/juego/juego.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './componentes/generales/menu/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegistroComponent,
    MenuComponent,
    JuegoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
