import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { User } from '../clases/users';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  users: any[] = [];

  filteredUsers: any[] = [];

  constructor( private get : GetService){}
  
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.get.getUsersList().subscribe((data: any[]) => {
      this.users = data;
      this.filteredUsers = this.users;
      console.log(this.users); 
    });
  }
  
  search(term: string) {
    this.filteredUsers = this.users.filter(user =>
      user.nickname && user.nickname.toLowerCase().includes(term.toLowerCase())
    );
  }
  

}
