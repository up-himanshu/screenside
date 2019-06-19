import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/generales/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  player: Usuario[] = [];
  constructor(private userService: UsuarioService) { }

  ngOnInit() {
    // this.userService.get
  }

}
