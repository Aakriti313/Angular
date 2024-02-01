import { Component } from '@angular/core';
import { User } from '../clases/users';
import { GetService } from "../services/get.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  users: Array<User> = [];
  usersInfo: any[];
  constructor( private _GetService: GetService) {
    this.usersInfo = [];
  }

  ngOnInit(): void {
    this._GetService.getUsersInfo().subscribe(data=> {
      this.usersInfo = data.messages;
    })
  }
}
