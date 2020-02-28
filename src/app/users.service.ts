
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
  gettingUsers() {
    return this.http.get("http://localhost:3000/users");
  }
  getUsers() {
    return this.http.get(" http://localhost:3000/users");
  }

  addUsers(data) {
    this.http.post('http://localhost:3000/users', JSON.stringify(data), this.httpOptions).toPromise().then((data: any) => {
    })
  }
  addWeekend(data) {
    this.http.post('  http://localhost:3000/weekEnd', JSON.stringify(data), this.httpOptions).toPromise().then((data: any) => {
    })
  }
}
