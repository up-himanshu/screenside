import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';

@Injectable({providedIn: 'root'})
export class AutentificacionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {      
        // logged in so return true        
          // check if route is restricted by role
          if (route.data.isAdmin) {
            // role not authorised so redirect to home page
            this.router.navigate(['perfil']);
            return false;
        }
         // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
