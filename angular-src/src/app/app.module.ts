import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'login', component : LoginComponent },
  { path : 'profile', component : ProfileComponent },
  { path : 'dashboard', component : DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FlashMessagesModule,
    HttpClientModule
  ],
  providers: [
    FlashMessagesService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
