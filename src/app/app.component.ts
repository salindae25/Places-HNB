import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn;
  constructor(private http: HttpClient, private router: Router, private appService: AppService
  ) {
    appService.emitChange.subscribe(
     response=>{
       this.loggedIn=response;
     
      });
  }
  ngOnInit() {
    console.log('app component');
    
    this.http.get('assets/variables.json').subscribe((data: any) => {
      localStorage.setItem('url', data.url);
      localStorage.setItem('apiKey', data.apiKey);
    });
    
  }
  logOut() {
    localStorage.setItem('token', '');
    this.loggedIn=false;
    this.router.navigateByUrl('/');
  }
}
