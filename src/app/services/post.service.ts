import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../clases/users';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  postUsers(user:User):Observable<any> {
    let url = "/server/user/create";
    return this.http.post(url, user);
  }
}
