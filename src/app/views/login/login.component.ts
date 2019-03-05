import { Component, OnInit } from '@angular/core';
import { LoginService, LoginRequest } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as sha512 from 'js-sha512';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { login } from './../../common/variables/var_en';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  message: String;
  loginForm: FormGroup;
  loginMsg: String;
  success: boolean;
  constructor(
    private http: Http,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    ///console.log()
    this.success = true;
    this.chargeLanguage();
    this.loginForm = fb.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }
  ngOnInit(): void {
    this.success = true;
  }
  onSubmit(dataLogin: any) {
    console.log('hola');
    let loginRequest = new LoginRequest();
    loginRequest.username = dataLogin.userName;
    loginRequest.password = sha512.sha512(dataLogin.password);

    console.log("======", loginRequest);
    if (this.loginForm.invalid) {
      return;
    } else {



      this.loginService.authRequest(
        loginRequest,
        (response) => {
          if (response.success == false) {
            console.log(response.message);
            this.success = false;
            this.message = response.message;
          } else {

            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('token', dataLogin.userName);
            //console.log("==============>localstorage:",localStorage.getItem('userScope'));
            this.router.navigate(['/personal']);
          }
        },
        (error) => {
          if (error == 401) {
            //console.log(error);
            this.success = false;
            this.message = "Usuario y/o password incorrectos";
          } else {
            console.log(error);
            this.success = false;
            this.message = "Ocurrió un error desconocido";
          }
        }
      );
      this.router.navigate(['/personal']);
    }
    /*if (dataLogin.uname === 'admin' && dataLogin.password === 'admin') {
      console.log('Entrar al sistema');
      this.setPermisosRolAndRedirect("4");// rol sin permisos: de
    }*/
  }

  chargeLanguage() {
    this.loginMsg = login.loginMsg_es;
  }

}
