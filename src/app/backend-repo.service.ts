import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendRepoService {

  BASE_URL = 'https://tranquil-anchorage-64258.herokuapp.com'

  constructor(private http: HttpClient) { }

  login(email, password){
    return this.http.post(this.BASE_URL + '/api/user/signin', {email, password}).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  signup(email, password){
    return this.http.post(this.BASE_URL + '/api/user/signup', {email, password}).pipe(map(
      (res) => {
        return res;
      }
    ))
  }
}
