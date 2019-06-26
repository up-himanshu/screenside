import { Component, OnInit } from '@angular/core';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-puntuaje',
  templateUrl: './puntuaje.component.html',
  styleUrls: ['./puntuaje.component.css']
})
export class PuntuajeComponent implements OnInit {
  public usuarios:any;
  public puntuajeGlobal:any = [];
  constructor(private userService: UsuarioService, private playerService: JugadorService,
    private authenticationService: AuthenticationService)
     { this.usuarios = authenticationService.currentUserValue; }

  

  

  ngOnInit() {
    this.playerService.conectar();
    this.playerService.verPuntuaje();
    this.playerService.currentMessage.subscribe(getPuntuaje  => 
      {
        this.puntuajeGlobal = getPuntuaje;
        if(getPuntuaje.length > 0)
        {
          console.log(this.puntuajeGlobal);
        }

      })
  }

  ngOnDestroy(): void {
    this.playerService.desconectar();
    }

}
