import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/generales/usuario';

@Component({
  selector: 'app-menujuego',
  templateUrl: './menujuego.component.html',
  styleUrls: ['./menujuego.component.css']
})
export class MenujuegoComponent implements OnInit {



//Espacio de variables
public currentUser:Usuario;
public partidas:any = [];


//Fin de espacio de variables

//Espacio constructor y de funciones
  constructor(private userService: UsuarioService, private playerService: JugadorService,
    private authenticationService: AuthenticationService,private router:Router)
    {
      this.currentUser = authenticationService.currentUserValue;
    }


    public iniciarJuego(id)
    {
      this.playerService.IniciarPartidas(id);
      setTimeout(()=>{
      this.router.navigate(['jugar']);
    },1000);
    }



//fin de espacio de funciones

  //inicio de espacio de eventos
  ngOnInit() {

   if(this.currentUser){
    this.playerService.verPartidas()
    this.playerService.getmenuJuego.subscribe(getPartidas  =>
      {
        this.partidas = getPartidas;
      })
    }
  }



  //afin del espacio de eventos

}
