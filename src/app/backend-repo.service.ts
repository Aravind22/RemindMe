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

  reminder_create(date,user, message){
    return this.http.post(this.BASE_URL + "/api/" +user+ "/add_date", {date, message}).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  reminder_getAll(user){
    return this.http.post(this.BASE_URL + '/api/' +user+ "/get_reminders", {user}).pipe(map(
      (res) => {
        return res;
      }
    ))
  }

  reminder_delete(user, message){
    return this.http.post(this.BASE_URL + "/api/" +user+ "/delete_reminder/" +message, {user,message}).pipe(map(
      (res) => {
        return res;
      }
    ))
  }
}
