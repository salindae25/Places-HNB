import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';

@Injectable()
export class ActivityAuthGuard implements CanActivate {
  constructor(private router: Router, private appService: AppService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let role;
    console.log('activity gurd works');      
    if(this.getRole()==='admin'){
      this.appService.emitRole(true);
      return true;
    } 
    this.router.navigateByUrl('/');
    return false;
  }
  getRole(){
    let user:any;
    if(localStorage.getItem('user')){
      user =JSON.parse(localStorage.getItem('user'))
      console.log(user.role);   
      return user.role;
    }
  }
}
