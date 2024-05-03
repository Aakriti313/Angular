import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http:HttpClient) {}

  //devolver info del usuario
  getUsersInfo(): Observable<any> {
    const url = "/server/user/login";
    return this.http.get(url);
  }

  //devolver info de los personajes
  getCharacters(): Observable<any> {
    let url = "/server/characters/";
    return this.http.get(url);
  }

  //devolver info de los items
  getItems(): Observable<any> {
    let url = "/server/items";
    return this.http.get(url); 
  }

  //devolver lista de users
  getUsersList(): Observable<any> {
    let url = "/server/user/get";
    return this.http.get(url);
  }
  
}
