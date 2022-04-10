import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SchedulingRegisterServiceService } from 'src/app/services/scheduling-register-service.service';
import { GetUsersService } from 'src/app/services/get-users.service';

@Component({
  selector: 'app-company-schedule',
  templateUrl: './company-schedule.component.html',
  styleUrls: ['./company-schedule.component.scss'],
})
export class CompanyScheduleComponent implements OnInit {
  schedulings: any = [];
  users: any = [];
  now: String;
  hour: String;

  constructor(
    private SchedulingRegisterService: SchedulingRegisterServiceService,
    private GetUsersService: GetUsersService,
  ) {
    let newDate: moment.Moment = moment.utc(new Date()).local();
    this.now = newDate.format('YYYY-MM-DD');
    this.hour = newDate.format('HH:mm');
  }

  ngOnInit(): void {
    this.SchedulingRegisterService.getScheduling().subscribe(
      (data) => {
        this.GetUsersService.getUsers().subscribe(
          (users) =>{
            this.users = users
          },
          (error) =>{
            console.log(error)
          })
        this.schedulings = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
