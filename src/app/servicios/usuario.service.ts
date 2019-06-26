import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from 'src/app/interface/generales/usuario';
import { ApiConfig } from '../interface/generales/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  // No se usa
  getAll() {
    return this.http.get<Usuario[]>(`${config.apiUrl}`);
}
getByID(id:number){ 
  return this.http.get<Usuario>(`${ApiConfig.apiUrl}/get/${id}`);
}
register(user){
  return this.http.post(`${ApiConfig.apiUrl}/register`,user);
}
getScores(id:number){
  return this.http.get<any>(`${ApiConfig.apiUrl}/score/${id}`);
}
}
