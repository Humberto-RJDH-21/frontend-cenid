import { Injectable } from '@angular/core';
import { ServicesCommon } from '../common/service.common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  URL_SING_UP = ServicesCommon.GATEWAY_URL_BASE() + "AUTH/loginwj";


  constructor(
    private http: Http
  ) {
    this.headers.append('Accept', 'application/json');
    
    //http.put(this.headers);
  }
  authRequest(
    loginRequest: LoginRequest,
    success,
    error
  ) {
    console.info("---------------",loginRequest);
    //console.log("Cambiando Headers");
    
  
/*
    let options = new RequestOptions({ headers: this.headers });
        
    this.http.post(
      this.URL_SING_UP,
      loginRequest,
      options,
      

    )
      .map(response => response.json())
      .catch(
        this.handleError
      )
      .subscribe(
        (response) => {
          //console.log(response);
          //console.log("==============");
          //localStorage.setItem('token', response.token);
          success(response);
        }
        , error);

      
*/
}
private handleError(error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  //console.error(errMsg);
  return Observable.throw(errMsg);
}


   
}
export class LoginRequest {
  username: string;
  password: string
}