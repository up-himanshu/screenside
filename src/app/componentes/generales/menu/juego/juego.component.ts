import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/generales/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { JugadorService } from 'src/app/servicios/jugador.service';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  player: Usuario[] = [];
  constructor(private userService: UsuarioService, private playerService: JugadorService) { }

  ngOnInit() {    
  }
  suscribir(){    
   this.playerService.conectar();   
   this.playerService.subscribir();
  }
  mensaje(){
    this.playerService.emitMessage();
  }
  recibir(){
    this.playerService.retrieveMessage();
  }
  cerrar(){
    this.playerService.desconectar();
  }
}
