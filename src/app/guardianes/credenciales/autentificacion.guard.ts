import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from 'src/app/servicios/autenfificacion.service';

@Injectable({providedIn: 'root'})
export class AutentificacionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
   // logged in so return true 
    if (currentUser) {
          // check if route is restricted by role
         // if (route.data.rol && route.data.rol.indexOf(currentUser.rol) === -1) {
           if(route.data.roles && route.data.roles.indexOf(currentUser.rol) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['perfil']);
            return false;
           // return true;
        }
         // authorised so return true
        return true;
        //return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
