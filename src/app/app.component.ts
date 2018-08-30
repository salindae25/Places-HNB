import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http:HttpClient){}
  ngOnInit(){
      this.http.get('assets/variables.json').subscribe((data: any) => {
        localStorage.setItem('url', data.url);
        localStorage.setItem('apiKey',data.apiKey);
      });
    
  }
}
