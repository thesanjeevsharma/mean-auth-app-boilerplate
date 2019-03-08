import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // registerUser(user: User) {
  //   let httpOptions = {
  //     headers : new Headers({
  //       'Content-Type':'application/json'
  //     })
  //   };
  //   return this.http.post('http://localhost:3000/users/register', user, httpOptions).pipe()
  // }
}
