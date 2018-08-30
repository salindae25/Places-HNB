import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from './places.model';
import Jquery from 'jquery';

@Injectable()
export class PlacesService {
  url;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('url')) {
      this.url = localStorage.getItem('url');
    } else {
      http.get('assets/variables.json').subscribe((data: any) => {
        this.url = data.url;
        localStorage.setItem('url', data.url);
      });
    }
  }

  doQuery(coOrdinates, radius, placeType) {


    let queryString = 'Place/?latitude=' + coOrdinates.Latititude + '&longitude=' + coOrdinates.Longititude;
    queryString += '&radius=' + radius + '&type=' + placeType;
    queryString = queryString.toLowerCase();

    return this.http.get(this.url + queryString);

  }
  getDetails(requString) {

    return this.http.get(this.url + 'Details/?reference=' + requString);
  }
}
