import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    let isAdmin:boolean
    if (localStorage.getItem('role')==='admin'){
    isAdmin= true
    } else{ isAdmin =false}

    if (isAdmin) {

      return true;
    } else {
     
      return this.router.createUrlTree(['/login']);
    }
  }
}
