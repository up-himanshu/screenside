import { Injectable } from "@angular/core";
import { AuthenticationService } from "./autenfificacion.service";
import { Usuario } from "../interface/generales/usuario";
import { BehaviorSubject } from "rxjs";
import { ApiConfig } from "../interface/generales/config";
declare const adonis: any;

@Injectable({
  providedIn: "root"
})
export class JugadorService {
  private webSocket = adonis.Ws(`ws:${ApiConfig.webSocket}`);
  // private wsp = adonis.wsp.codes;
  private error;
  public datos: any;
  private isConnected = false;
  private currentUser: Usuario;
  private data;
  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUserValue;
  }

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  private menuJuego = new BehaviorSubject([]);
  getmenuJuego = this.menuJuego.asObservable();

  private puntuajeJuego = new BehaviorSubject([]);
  getpuntuajeJuego = this.puntuajeJuego.asObservable();

  private puntuajeJuegoUsuario = new BehaviorSubject([]);
  getpuntuajeJuegoUsuario = this.puntuajeJuegoUsuario.asObservable();

  private player;
  public get playerService(): any {
    return this.player;
  }
  conectar() {
    if (this.isConnected) {
      console.log("Already Connected");
      return;
    } else {
      this.isConnected = true;
      this.webSocket.withJwtToken(this.currentUser.token.token).connect();
    }
    this.bindCloseEvent();
    this.bindOpenEvent();
    this.player = this.webSocket.subscribe("player");
  }

  verPartidas() {
    this.player.emit("games", null);
    this.player.on("games", event => {
      this.menuJuego.next(event);
    });
  }

  public idPartida;
  IniciarPartidas(event) {
    this.idPartida = event;
    this.player.emit("startgame", {
      idusuario: this.currentUser.id,
      id: event
    });
  }

  verPuntuaje() {
    this.player.emit("globalscores", null);
    this.player.on("globalscores", event => {
      console.log(event);

      this.puntuajeJuego.next(event);
    });
  }

  verPuntuajeUsuario() {
    this.player.emit("score", { id: this.currentUser.id });
    this.player.on("score", event => {
      console.log(event);

      this.puntuajeJuegoUsuario.next(event);
    });
  }
  enviarPuntuaje(puntos) {
    this.player.emit("savescore", {
      id: this.currentUser.id,
      puntuaje: puntos
    });
  }

  IniciarPartida() {
    this.player.emit("message", {
      id: this.idPartida
    });

    this.player.on("message", event => {
      if (this.idPartida == event.id) {
        console.log(event);
        this.messageSource.next(event);
      }
    });
  }

  ActualizarDatos(event) {
    this.player.emit("data", event);

    setTimeout(() => {
      this.player.emit("message", {
        id: this.idPartida
      });
    }, 100);
  }

  desconectar() {
    if (this.isConnected) {
      this.isConnected = false;
      this.webSocket.close();
    } else {
      console.log("Already Closed");
      return;
    }
  }

  public get mensaje(): any {
    return this.datos;
  }

  /**
   * Events to listen applsication state
   */
  bindOpenEvent() {
    this.webSocket.on("open", () => {
      this.isConnected = true;
    });
  }

  bindCloseEvent() {
    this.webSocket.on("close", () => {
      this.isConnected = false;
    });
  }

  bindTopicErrorEvent() {
    this.player.on("error", error => {
      this.error = error;
      console.log(error);
    });
  }
}
