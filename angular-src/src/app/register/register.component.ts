import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

//Weird YT Stuff - https://www.youtube.com/watch?v=avsKHNFnLQU

import { User } from '../shared/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  visitor: User;

  constructor(private fb: FormBuilder, private flash: FlashMessagesService, private authService: AuthService) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ngOnInit() {
  }

  onSubmit() {
    this.visitor = this.registerForm.value;
    //this.flash.show("Thank you, " + this.visitor.name.toString() + "!", { cssClass : 'alert-success', timeout: 3000 });  
    this.registerForm.reset();
    // this.authService.registerUser(this.visitor).subscribe((data) => {
    //   console.log(data);
    // })
  }

}
