import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';

let httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/users/register', user, httpOptions );
  }
}
