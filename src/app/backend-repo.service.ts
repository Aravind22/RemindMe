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
        var response = JSON.parse(JSON.stringify(res))
        localStorage.setItem('access_token', response.token)
        return response.message;
      }
    ))
  }

  signup(email, password, number){
    return this.http.post(this.BASE_URL + '/api/user/signup', {email, password, number}).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  reminder_create(date,user, message){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' +localStorage.getItem('access_token'))
    }
    return this.http.post(this.BASE_URL + "/api/" +user+ "/add_date", {date, message}, httpOptions).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  reminder_getAll(user){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' +localStorage.getItem('access_token'))
    }
    return this.http.post(this.BASE_URL + '/api/' +user+ "/get_reminders", {user}, httpOptions).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  capsule_getAll(user){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' +localStorage.getItem('access_token'))
    }
    return this.http.post(this.BASE_URL + '/api/' +user+ '/get_capsules', {user}, httpOptions).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  reminder_delete(user, message, date){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' +localStorage.getItem('access_token'))
    }
    return this.http.post(this.BASE_URL + "/api/" +user+ "/delete_reminder/" +date+"/"+message, {user,message}, httpOptions).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  logout(){
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization',  'Bearer ' +localStorage.getItem('access_token'))
    }
    return this.http.post(this.BASE_URL + '/api/logout/', {}, httpOptions).pipe(map(
      (res)=> {
        localStorage.removeItem('access_token')
        return res;
      }
    ))
  }

  check_loggedIn(): boolean{
    return localStorage.getItem('access_token') !== null
  }

}
