import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { Usuario } from 'src/app/interface/generales/usuario';
import { Role } from './interface/generales/roles';
import { JugadorService } from './servicios/jugador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientside';
  currentUser: Usuario;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
     private playerService: JugadorService,
    
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

ngOnInit() {
  this.playerService.conectar();
  
}

get isAdmin() {
  return this.currentUser && this.currentUser.rol === Role.admin;
}
logout() {  
    this.authenticationService.logout();    
    this.router.navigate(['/login']);    
}
}
