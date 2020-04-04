import { Component, OnInit } from '@angular/core';
import { BackendRepoService } from '../backend-repo.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private api: BackendRepoService) { }
  show: boolean = false
  username: string = null
  password: string = null

  ngOnInit(): void {
  }

  signup(){
   this.api.signup(this.username, this.password).subscribe(data => {
      console.log(data)
    })
  }

}
