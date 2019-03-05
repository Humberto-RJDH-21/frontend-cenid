import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
//import * as en from '../../common/variables/variables_en.json';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:Array<any>;
  //var en=require('../../common/variables/variables_en.json');
  //let tableName=en.Users.tableName;
  constructor(
    private userService:UsersService
  ) { 
   // console.log(en);

  }

  //let tableName=en.users.tableName;
  
  ngOnInit() {
    
  }

  finAllUsers(){
    this.userService.getAll(
      (response) => {
          console.log(response);
          //this.users=processInformationResponse(response);
          //this.responseEvalAndProcessInformation(response);
      },

      (error)=>{
         //this.handlerErrorResponse();

      }
  ); 
  }

  processInformationResponse(inputList: Array<any>){
    inputList.forEach((item) => {
      //let row = this.createRowDescription(item);
      //this.users.push(row);
  });
  }

  //create RowDescription():UserRow{

  //} 
}

