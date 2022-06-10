import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //  
    if (localStorage.length > 0) {
      return true;
    }
    else {
      this.router.navigate(['pages/login']);
      return false;
    }


    // return true;



  }

}
