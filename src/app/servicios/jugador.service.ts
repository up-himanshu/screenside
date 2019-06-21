import { Injectable } from '@angular/core';
declare const adonis: any;

@Injectable({
  providedIn: 'root'
})
export class JugadorService {  
   private ws = adonis.Ws('ws://localhost:3333');
   private chat;
   private isConnected = false;
  constructor() {      
  }
  conectar(){
    this.ws.connect();
  }
  subscribir(){
    this.chat = this.ws.subscribe('chat');
  }
  openEvent(){  
    this.ws.on('open', () => {
      this.isConnected = true
    })   
  }
  closeEvent(){
    this.ws.on('close', () => {
      this.isConnected = false
    })
  }
  emitMessage(){
    this.chat.emit('message', {
      body: 'hello',
      user: 'virk'
    })
  }

 
}
