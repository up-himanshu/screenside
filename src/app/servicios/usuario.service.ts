import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from 'src/app/interface/generales/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Usuario[]>('localhost:3333/users/authenticate');
}
}
