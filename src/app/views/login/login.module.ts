import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app.routing';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    AppRoutingModule,
    AlertModule.forRoot(),
    BrowserModule,     
    FormsModule,
    ReactiveFormsModule,
    CommonModule,    
    HttpModule    
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
