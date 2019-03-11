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

  user: Object;
  authToken: String = null;

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/users/register', user, httpOptions );
  }

  authenticateUser(user) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/users/authenticate', user, httpOptions );
  }

  getProfile() {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'bearer ' + this.authToken
      })
    };
    return this.http.get('http://localhost:3000/users/profile', httpOptions );
  }

  storeUserData(user){
    localStorage.setItem('id_token', user.JWTtoken);
    this.authToken = user.JWTtoken;
    user = {
      name: user.name,
      username: user.username,
      email: user.email
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  isLoggedIn() {
    if (this.authToken === null || this.authToken === '') {
      return false;
    }
    return true;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
