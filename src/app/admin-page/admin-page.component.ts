import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { User } from '../clases/users';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  users: any[] = [];

  filteredUsers: any[] = [];

  constructor( 
    private get : GetService,
    private post : PostService){}
  
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
  
  delete(nickname: string) {
    this.post.deleteUser(nickname).subscribe(
      (result) => {
        console.log(result);
        // Aquí puedes actualizar la lista de usuarios después de eliminar uno si lo deseas
        // Por ejemplo, podrías volver a cargar la lista de usuarios con this.getList();
      },
      (error) => {
        console.error("Error deleting user:", error);
      }
    );
  }

}
