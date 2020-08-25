import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apikey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apikey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us`)
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=29be717171a24de3904107dcd0427982`);
  }
  getTopHeadlinesCategoria(categoria: string) {
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);

    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=29be717171a24de3904107dcd0427982`)

  }
}
