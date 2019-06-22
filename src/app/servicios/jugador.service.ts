import { Injectable } from '@angular/core';
import { AuthenticationService } from './autenfificacion.service';
import { Usuario } from '../interface/generales/usuario';
declare const adonis: any;

@Injectable({
  providedIn: 'root'
})
export class JugadorService {  
   private ws = adonis.Ws('ws://localhost:3333');
  // private wsp = adonis.wsp.codes;
   private chat;
   private player;
   private isConnected = false;
   private currentUser: Usuario;
   private data;
  constructor(private authenticationService: AuthenticationService) {     
    this.currentUser = authenticationService.currentUserValue;
  }
  
  conectar(){
    if(this.isConnected){
      console.log('Already Connected')
      return;      
    }else
    {
      this.isConnected = true;
    this.ws
    .withJwtToken(this.currentUser.token.token)
    .connect(); 
    }
  }


  subscribir(){
    this.player = this.ws.subscribe('player');
  }  


  emitMessage(){
    this.player.emit('message', {
      body: 'hello',
      user: 'virk'
    });
  }


  retrieveMessage() {
    this.player.on('message',(info)=> {
      this.data = info;
      console.log(this.data);
    })
  }


  desconectar(){
    if(this.isConnected){
      this.isConnected = false;
    this.ws.close();
    }
    else {
      console.log('Already Closed')
      return;
      
    }
  }


/**
 * Events to listen application state
 */
isOpenEvent(){  
  this.ws.on('open', () => {
    this.isConnected = true
  })   
}
isCloseEvent(){
  this.ws.on('close', () => {
    this.isConnected = false
  })
}
}
