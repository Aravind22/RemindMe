import { Component, OnInit } from '@angular/core';
import { BackendRepoService } from '../backend-repo.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: BackendRepoService, private router: Router) { }

  date: any;
  month: String;
  message: String;
  user: String;
  dateArr: any;
  msgArr: String[];
  data:any;
  show:boolean = true;
  create_show:boolean = false;
  showmsg:boolean = false;
  date_Select:any = []
  month_Select:any = [ 
    {
      index: '1',
      month: 'January',
      dates: 31
    },
    {
      index: '2',
      month: 'February',
      dates: 29
    },
    {
      index: '3',
      month: 'March',
      dates: 31
    },
    {
      index: '4',
      month: 'April',
      dates: 30
    },
    {
      index: '5',
      month: 'May',
      dates: 31
    },
    {
      index: '6',
      month: 'June',
      dates: 30
    },
    {
      index: '7',
      month: 'July',
      daets: 31
    },
    {
      index: '8',
      month: 'August',
      dates: 31
    },
    {
      index: '9',
      month: 'September',
      dates: 30
    },
    {
      index: '10',
      month: 'October',
      dates: 31
    },
    {
      index: '11',
      month: 'November',
      dates: 30
    },
    {
      index: '12',
      month: 'December',
      dates: 31
    },

  ];
  ErrorClass: boolean = false;
  rem_val:any=[];
  delete_show: boolean = false;
  deleteMsg: boolean = false;
  

  ngOnInit(): void {
    this.user = localStorage.getItem("user")
    this.getAllReminders()
    this.generate_data()
  }

  getAllReminders(){
    this.show = true;
    this.api.reminder_getAll(this.user).subscribe(data => {
      var dat = JSON.parse(JSON.stringify(data))
      console.log(dat)
      if(dat.date){
        this.show = false;
        this.dateArr = data["date"];  
        this.msgArr = data["message"]
      } else {
        this.rem_val = dat.message
        this.show = false
      }
    })
  }

  generate_data(){
    for(let i=1;i<32;i++){
      this.date_Select.push(i)
    }
  }

  async create_reminder(){
    this.create_show = true
    if(this.message == undefined || this.date == undefined || this.month == undefined){
      this.ErrorClass = true;
    }else{
      var month_index = this.month_Select.findIndex(obj => obj.month === this.month)
      this.date = this.date + "/" + this.month_Select[month_index].index;
      this.api.reminder_create(this.date, this.user, this.message).subscribe(data => {
        var msg = JSON.parse(JSON.stringify(data))
        if(msg.message.includes("updated")){  
          this.create_show = false;
          window.location.reload()
        }
      })
    }
  }

  delete_reminder(msg){
    this.delete_show = true
    this.api.reminder_delete(this.user, msg).subscribe(data => {
      var delMsg = JSON.parse(JSON.stringify(data))
      if(delMsg.message.includes("deleted!")){
        this.delete_show = false;
        window.location.reload()
        this.deleteMsg = true
      }
    })
  }

  logout(){
    localStorage.setItem('user', '')
    this.router.navigate(['/'])
  }

}
