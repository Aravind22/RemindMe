import { Component, OnInit } from '@angular/core';
import { BackendRepoService } from '../backend-repo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private api: BackendRepoService, private router: Router) { }
  show: boolean = false
  username: string = null
  password: string = null
  cpassword: string = null
  checked: boolean = false;
  errors: string;

  ngOnInit(): void {
  }

  validate_form(){
    if(this.password.length < 8){
      this.errors ="Password should be atleast 8 characters"
      return false;
    } else if(this.password != this.cpassword){
      this.errors =("passwords doesnt match")
      return false;
    } else if( this.username == null || this.password == null || this.cpassword == null){
      this.errors = "All fields are mandatory"
      return false;
    } else if( this.checked == false){
      this.errors = "Terms and conditions needs to be accepted"
      return false;
    }
     else {
      return true;
    }
  }

  signup(){
    if (this.validate_form()) {
      this.show = true;
      this.api.signup(this.username, this.password).subscribe(data => {
        var msg = JSON.parse(JSON.stringify(data))
        if(msg.message.toString().includes("successfully")){
          this.errors = null;
          this.show = false;
          localStorage.setItem('user', this.username)
          this.router.navigate(['/home'])
        }
      })
    }
  }

}
