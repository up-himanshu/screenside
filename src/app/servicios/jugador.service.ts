import { Injectable } from '@angular/core';
import * as Ws from '@adonisjs/websocket-client';


@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private isConnected= true;
  private ws = Ws('ws://localhost:3333');
  constructor() { }
  
conexionAbierta()
{
  this.ws.on('open', () => {
    this.isConnected = true
  })
}
conenexionCerrada() {
  this.ws.on('close', () => {
    this.isConnected = false
  })
}

// 
subscribir() {
  this.ws.subscribe('chat')
}
/*
const chat = ws.subscribe('chat')

chat.on('ready', () => {
  chat.emit('message', 'hello')
})
 */
}
