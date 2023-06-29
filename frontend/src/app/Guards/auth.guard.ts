import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      
    const isLoggedIn = localStorage.getItem('token') !== null;

    if (isLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
