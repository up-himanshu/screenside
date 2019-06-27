import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { Usuario } from 'src/app/interface/generales/usuario';
import { Router } from '@angular/router';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { first } from 'rxjs/operators';
import { JugadorService } from 'src/app/servicios/jugador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  amount:number;
  
  games = [];
  error = '';
  private currentUser: Usuario;
  constructor(
    private authService: AuthenticationService,    
    private adminService: AdministracionService) {    
     this.currentUser = this.authService.currentUserValue; 
     this.amount = 1;
   }

  ngOnInit() {
    if(this.currentUser)
    {      
      this.adminService.sgetGame();
      this.adminService.currentGame.subscribe(
        getgames => {
          this.games = getgames;
        }
      )
    }
  }

  
  /*
  getGames(){
    this.adminService.getGames()
    .pipe(first())
    .subscribe(
      data => {
      
      },
      error => {
        this.error = error;
      }

    )
  }*/
}
