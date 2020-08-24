import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=29be717171a24de3904107dcd0427982`);
  }
}
