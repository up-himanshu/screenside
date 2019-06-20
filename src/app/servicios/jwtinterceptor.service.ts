import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './autenfificacion.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor{
  
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.servicioAutent.currentUserValue;    
    if(currentUser && currentUser.token) {
      req = req.clone({
       setHeaders:{ 
           Authorization: `Bearer ${currentUser.token.token}`
       }
      });
    }
//  throw new Error("Method not implemented.");
return next.handle(req);
  }
 

  constructor(private servicioAutent: AuthenticationService) { }
}
