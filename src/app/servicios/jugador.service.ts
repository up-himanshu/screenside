import { Injectable } from '@angular/core';
import { AuthenticationService } from './autenfificacion.service';
import { Usuario } from '../interface/generales/usuario';
import { BehaviorSubject } from 'rxjs';
declare const adonis: any;

@Injectable({
  providedIn: 'root'
})
export class JugadorService {  
   private ws = adonis.Ws('ws://192.168.1.64:3333');
  // private wsp = adonis.wsp.codes;
   private chat;
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


    
    this.player = this.ws.subscribe('player');
    this.player.emit('message', {
      id: this.currentUser.id
    });

   
    

    this.player.on('message', (event) => {
      console.log(event)
      this.messageSource.next(JSON.parse(event))
      
     
    })

  }

  


  ActualizarDatos(event){
    this.player.emit('data',event);
    
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
 
  public get mensaje():any{return this.datos} 

/**
 * Events to listen applsication state
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
