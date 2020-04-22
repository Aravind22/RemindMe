import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { BackendRepoService } from './backend-repo.service'

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private api:BackendRepoService, private router: Router) { }

  canActivate(): boolean{
    if(!this.api.check_loggedIn()){
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
}
