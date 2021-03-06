import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendRepoService } from '../backend-repo.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = null
  password: string = null
  show: boolean = false

  constructor(private route: Router, private api: BackendRepoService) { }

  ngOnInit(): void {
    if(this.api.check_loggedIn){
      this.route.navigate(['/home'])
    }
  }

  navigate_signup(){
    this.route.navigate(['signup'])
  }

  async login(){
   this.show = true
   if(this.username != null && this.password != null){
    this.api.login(this.username, this.password).subscribe(data => {
      if(data.includes('Successfully')){
        this.show = false
        localStorage.setItem("user", this.username);
        this.route.navigate(['/home'])
      }
    })
   }
  }

}
