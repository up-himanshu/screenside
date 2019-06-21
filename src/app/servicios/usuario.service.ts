import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from 'src/app/interface/generales/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Usuario[]>(`${config.apiUrl}`);
}
getByID(id:number){ 
  return this.http.get<Usuario>(`http://127.0.0.1:3333/get/${id}`);
}
register(user){
  return this.http.post('http://127.0.0.1:3333/register',user);
}
}
