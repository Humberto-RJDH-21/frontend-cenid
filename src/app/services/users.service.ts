import { Injectable } from '@angular/core';
import { ServicesCommon } from '../common/service.common';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  URL_USERS = ServicesCommon.GATEWAY_URL_BASE() + "USERS";
  


  constructor(
    private http: Http
  ) {
    this.headers.append('Accept', 'application/json');
    
    //http.put(this.headers);
  }
  getAll(    
    success,
    error
  ) {
        
    this.http.get(
      this.URL_USERS,               
    )
      .map(response => response.json())
      .catch(
        this.handleError
      )
      .subscribe(
        (response) => {          
          success(response);
        }
        , error);
}
private handleError(error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    //const err = body.error || JSON.stringify(body);
    console.log("Error");
    errMsg = `${error.status}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  //console.error(errMsg);
  return Observable.throw(errMsg);
}   
}
