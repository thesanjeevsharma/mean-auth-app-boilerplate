import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private flash: FlashMessagesService) { }

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
  }

  onSubmit() {
    let user = this.loginForm.value;
    this.authService.authenticateUser(user).subscribe((data) => {
      if(data['success']){
        this.flash.show('Welcome Home!', { cssClass : 'alert-success', timeout: 3000 });
        this.authService.storeUserData(data['data']);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.flash.show(data['message'], { cssClass : 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    })
    this.loginForm.reset();
  }

}
