import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../interface/generales/config';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JugadorService } from './jugador.service';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  private admin;
  private currentGameSubject: BehaviorSubject<any>;
  public currentGame: Observable<any>;
  private player;
  constructor(
    private http: HttpClient,
    private playerService: JugadorService
    ) {
    this.currentGameSubject = new BehaviorSubject<any>([]);
    this.currentGame = this.currentGameSubject.asObservable();
      this.player = this.playerService.playerService;
   }
  createGame(name:string){
    return this.http.post(`${ApiConfig.apiUrl}/createg`,{name})
  }

  getGames(){
    return this.http.get<any>(`${ApiConfig.apiUrl}/updateg`)
    .pipe(map(game => {
      this.currentGameSubject.next(game);
    }))
  }
  updateGame(id:number){
    return this.http.post<any>(`${ApiConfig.apiUrl}/updateg`,{id})
  }

  deleteGame(id:number){
    return this.http.post(`${ApiConfig.apiUrl}/deleteg`,{id})
  }

  //Socket
  sgetGame(){
    this.player.emit('games',null);
    this.player.on('games', (allgames) => {
      this.currentGameSubject.next(allgames);
    })
  }

   screateGame(message){     
    this.player.emit('games',{name: message})
   } 
}
