import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';


@Injectable()
export class Auth implements CanActivate {
    constructor(   private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
            if ( localStorage.getItem('token')) {
                return true;
            }
            else 
            {
                this.router.navigate(['login'])
                 return false ;
            }
    
    }
    
}