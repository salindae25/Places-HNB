import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AppService } from './app.service';

@Injectable()
export class PlaceAuthGuard implements CanActivate {
  constructor(private router: Router, private appService: AppService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token;
    console.log('place auth guard');
    
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    if (token === 'letmein') {
      this.appService.emitPlace(true);
      return true;
    }
    this.router.navigateByUrl('/');
    return false;

  }
}
