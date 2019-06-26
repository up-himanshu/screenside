import { Injectable } from '@angular/core';
import { AuthenticationService } from './autenfificacion.service';
import { Usuario } from '../interface/generales/usuario';
import { BehaviorSubject } from 'rxjs';
import { ApiConfig } from '../interface/generales/config';
declare const adonis: any;

@Injectable({
  providedIn: 'root'
})
export class JugadorService {  
   private ws = adonis.Ws(`ws:${ApiConfig.webSocket}`);
  // private wsp = adonis.wsp.codes;
   private error;
   public datos:any;
   private isConnected = false;
   private currentUser: Usuario;
   private data;
  constructor(private authenticationService: AuthenticationService) {     
    this.currentUser = authenticationService.currentUserValue;
  }

  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  private player;
  conectar(){
    if(this.isConnected){
      console.log('Already Connected');
      return;      
    }else
    {
      this.isConnected = true;
    this.ws
    .withJwtToken(this.currentUser.token.token)
    .connect(); 
    }
   this.bindCloseEvent();
   this.bindOpenEvent();
    this.player = this.ws.subscribe('player');

  }

  verPartidas()
  {
    this.player.emit('games', null);
    this.player.on('games', (event) => {
      
      console.log(event);
      
         this.messageSource.next(event);
      
    });
  }

  IniciarPartida()
  {
    this.player.emit('message', {
      id: this.currentUser.id,
    });
  }

  getDatosPartida()
  {
    this.player.on('message', (event) => {
      console.log(event)
      
         this.messageSource.next(JSON.parse(event))

      
    });
  };

      
     
      
  

  



  ActualizarDatos(event){
    this.player.emit('data', event);
    setTimeout(()=>{
    this.player.emit('message', {
      id: this.currentUser.id,
    });
  },100);
  }
  
  
 
  


  desconectar(){
    if(this.isConnected){
      this.isConnected = false;
    this.ws.close();
    }
    else {
      console.log('Already Closed');
      return;      
    }
  }
 
  public get mensaje():any{return this.datos} 

/**
 * Events to listen applsication state
 */
bindOpenEvent(){  
  this.ws.on('open', () => {
    this.isConnected = true;
  })   
}


bindCloseEvent(){
  this.ws.on('close', () => {
    this.isConnected = false;
  })
}

bindTopicErrorEvent(){
  this.player.on('error', (error) => {
    this.error = error;
    console.log(error);
  })
}


}
