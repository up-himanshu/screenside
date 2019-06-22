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
public datos:any
public dato2s:any;
  ngOnInit() {  
      this.playerService.conectar();

      this.datos   =  JSON.stringify( this.playerService.mensaje); 
    
  }
  
  cerrar(){
    alert(this.datos);
    this.playerService.desconectar();
  }

  
}
