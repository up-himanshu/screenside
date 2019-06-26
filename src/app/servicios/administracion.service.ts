import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../interface/generales/config';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private http: HttpClient) { }
  createGame(){
    return this.http.post(`${ApiConfig.apiUrl}/createg`,{})
  }

  updateGame(){
    return this.http.post(`${ApiConfig.apiUrl}/updateg`,{})
  }

  deleteGame(){
    return this.http.post(`${ApiConfig.apiUrl}/deleteg`,{})
  }
}
