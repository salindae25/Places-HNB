import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ImageService {
  apiKey = 'AIzaSyDgiFkqYXkSGmgFRV6F0ApZpGVikwGZhgw';
  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(url);

  }
}
