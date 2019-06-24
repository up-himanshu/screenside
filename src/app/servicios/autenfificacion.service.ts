import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Usuario } from 'src/app/interface/generales/usuario';
import { ApiConfig } from '../interface/generales/config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }     

login(correo: string, contrasena: string) {
    return this.http.post<any>(`${ApiConfig.apiUrl}/login`, { correo, contrasena })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));                
                this.currentUserSubject.next(user);  
                // console.log('There IS token');  
            }
            // console.log('There is NO token');
            return user;
        }));
}
    logout() {
        // remove user from local storage to log user out        
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    register(correo: string, contrasena: string, usuario: string){
        return this.http.post<any>(`${ApiConfig.apiUrl}/register`,{correo,usuario,contrasena})
        .pipe(map(user => {             
            return user;    
        }))
    }
}
