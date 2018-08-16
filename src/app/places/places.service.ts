import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from './places.model';
import Jquery from 'jquery';

@Injectable()
export class PlacesService {
  url = 'http://localhost/PlaceWebApi/api/';

  constructor(private http: HttpClient) { }

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
