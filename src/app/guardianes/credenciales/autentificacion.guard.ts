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
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/iniciosesion'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
