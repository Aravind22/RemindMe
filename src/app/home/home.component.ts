import { Component, OnInit } from '@angular/core';
import { BackendRepoService } from '../backend-repo.service'
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private api: BackendRepoService, private router: Router) { }

  now = moment().format('YYYY-MM-DD');
  date: any;
  month: String;
  message: String;
  user: String;
  dateArr: any;
  msgArr: String[];
  typeArr: any = [];
  statusArr: any = [];
  data: any;
  show: boolean = true;
  cshow: boolean = true;
  create_show: boolean = false;
  showmsg: boolean = false;
  showlogout: boolean = false;
  errMsg: String;
  date_Select: any = []
  SuccessClass:boolean = false;
  month_Select: any = [
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
  rem_val: any = [];
  delete_show: boolean = false;
  deleteMsg: boolean = false;


  ngOnInit(): void {
    this.user = localStorage.getItem("user")
    this.generate_data()
    // this.getAllCapsules()
    this.getAllReminders()
  }

  getAllReminders() {
    this.api.reminder_getAll(this.user).subscribe(data => {
      var dat = JSON.parse(JSON.stringify(data))
      if (dat.date) {
        this.show = false;
        this.dateArr = data["date"]
        this.msgArr = data["message"]
      } else {
        this.rem_val = dat.message
        this.show = false
      }
    })
  }

  getAllCapsules() {
    this.api.capsule_getAll(this.user).subscribe(data => {
      if (data["type"]) {
        this.typeArr.push("Permanent")
      } else {
        this.typeArr.push("Temporary")
      }
      if (data["status"]) {
        this.statusArr.push("Active")
      } else {
        this.statusArr.push("Available")
      }
      this.cshow = false
    })
  }

  generate_data() {
    for (let i = 1; i < 32; i++) {
      this.date_Select.push(i)
    }
  }

  async create_reminder() {
    this.create_show = true
    if (this.message == undefined || this.date == undefined) {
      this.ErrorClass = true;
      this.create_show = false
      this.errMsg = "All Fields are mandatory!"
    } else if (this.date < this.now) {
      this.ErrorClass = true;
      this.create_show = false;
      this.errMsg = "Date can't be in past!"
    } else {
      this.api.reminder_create(this.date, this.user, this.message).subscribe(data => {
        var msg = JSON.parse(JSON.stringify(data))
        if (msg.message.includes("updated")) {
          this.create_show = false;
          this.show = true;
          this.SuccessClass = true
          this.errMsg = "Reminder created"
          this.getAllReminders()
        }
      })
    }
  }

  delete_reminder(msg,date) {
    this.delete_show = true
    this.api.reminder_delete(this.user, msg, date).subscribe(data => {
      var delMsg = JSON.parse(JSON.stringify(data))
      if (delMsg.message.includes("deleted!")) {
        this.delete_show = false;
        window.location.reload()
        this.deleteMsg = true
      }
    })
  }

  logout() {
    this.showlogout = true
    this.api.logout().subscribe(data => {
      var Msg = JSON.parse(JSON.stringify(data))
      if (Msg.message.includes("Successfully")) {
        this.showlogout = false
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        this.router.navigate(['/'])
      }
    })
  }

}
