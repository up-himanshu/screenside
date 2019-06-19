import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { Usuario } from 'src/app/interface/generales/usuario';

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
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

get isAdmin() {
  return this.currentUser && this.currentUser.admin == true;
}
logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
