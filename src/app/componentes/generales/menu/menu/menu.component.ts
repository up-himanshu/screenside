import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/generales/usuario';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser: Usuario;
  userFromApi: Usuario;
  constructor(
    private authService: AuthenticationService,
    private userService: UsuarioService
  ) {
    this.currentUser = this.authService.currentUserValue;
   }

  ngOnInit() {
    this.userService.getByID(this.currentUser.id).pipe(first()).subscribe(
      user => {
        this.userFromApi= user;
      });
      // console.log(this.currentUser);
      console.log(this.userFromApi);
  }

}
