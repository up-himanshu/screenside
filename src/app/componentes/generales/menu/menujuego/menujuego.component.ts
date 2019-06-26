import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';

@Component({
  selector: 'app-menujuego',
  templateUrl: './menujuego.component.html',
  styleUrls: ['./menujuego.component.css']
})
export class MenujuegoComponent implements OnInit, OnDestroy {
 


//Espacio de variables
public usuarios:any;
public partidas:any = [];

//Fin de espacio de variables

//Espacio constructor y de funciones
  constructor(private userService: UsuarioService, private playerService: JugadorService,
    private authenticationService: AuthenticationService) 
    { 
      this.usuarios = authenticationService.currentUserValue;
    }

 


//fin de espacio de funciones

  //inicio de espacio de eventos
  ngOnInit() {
    this.playerService.conectar();
    this.playerService.verPartidas()
    this.playerService.currentMessage.subscribe(getPartidas  => 
      {
        this.partidas = getPartidas;
      })
  }


  ngOnDestroy(): void {
  this.playerService.desconectar();
  }
  //afin del espacio de eventos

}
