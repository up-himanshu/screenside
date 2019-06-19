import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './autenfificacion.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorinterceptorService implements HttpInterceptor{
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    //throw new Error("Method not implemented.");
    return next.handle(req).pipe(catchError(err => {
      // if([401,403].indexOf(err.status) !== -1)
      if(err.status === 401) {
        this.servicioAtenti.logout();
        location.reload(true);
      }
      const errors = err.errors.message || err.statusText;
      return throwError(errors);
    }))
  }

  constructor(private servicioAtenti: AuthenticationService) { }
}
