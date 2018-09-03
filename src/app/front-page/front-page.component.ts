import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css', './bootstrap.min.css']
})
export class FrontPageComponent implements OnInit {
  userName: string;
  userPassword;
  users=[]
  constructor(private router: Router,private appService:AppService) { 
    this.users.push({ name: 'dave', password: 'mario',role:'user' });
    this.users.push({ name: 'garlic', password: 'soup', role: 'user'});
    this.users.push({ name: 'car', password: 'race', role: 'user'});
    this.users.push({ name: 'admin', password: 'root', role: 'admin' });
    
  }
  ngOnInit() {
    console.log('front component');
    
    if(this.allReadySignIn())
    {
      this.router.navigateByUrl('/places');      
    }
  }
  allReadySignIn():boolean{
    return localStorage.getItem('token')?true:false;
  }
  onSubmit(name, password) {
    let auth = this.checkAuthentication(name, password)
    if(auth){
      localStorage.setItem('token','letmein');
      this.appService.emitPlace(true)
      this.gotoPlaces()
    }
  }
  checkAuthentication(name, password): boolean | null {
    let user:any;
    let auth =false;
    for  (user of this.users){
      if(user.name===name){
         if(user.password===password){
          auth= true;
           localStorage.setItem('user', JSON.stringify(user) );
         }
      }
    }
    return auth;
  }
  gotoPlaces() {
    this.router.navigateByUrl('/places');
  }

}
