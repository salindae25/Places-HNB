import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from './places.model';

@Injectable()
export class PlacesService {
  url = 'api/place/nearbysearch/';
  apiKey = 'AIzaSyCTY07DLNb078JDTetb41jgDnLZxOQtbgg';
  constructor(private http: HttpClient) { }

  doQuery(coOrdinates, radius, placeType) {
    let queryString = 'json?location=' + coOrdinates.Latititude + ',' + coOrdinates.Longititude;
    queryString += '&radius=' + radius + '&type=' + placeType + '&key=';
    queryString = queryString.toLowerCase();

    return this.http.get(this.url + queryString + this.apiKey);

  }
  getDetails(url) {
    return this.http.get(url);
  }
}
