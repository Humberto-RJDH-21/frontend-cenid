import { Component, OnInit, ViewChild } from '@angular/core';
//import{ en} from '../../../common/variables/var_en';
import { PersonalService } from '../../../services/personal.service';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Personal } from '../../../models/personal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { updateClassProp } from '@angular/core/src/render3/styling';

@Component({
  selector: 'app-personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.scss']
})
export class PersonalTableComponent implements OnInit {
  @ViewChild('myTable') table: any;

  
  
  temp: Array<Personal>;
  
  timeout: any;
  newPersonal: Personal;
  swUpdate: Boolean;
  personalForm: FormGroup;
  messages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: "No hay datos para mostrar",

    // Footer total message
    totalMessage: "Total",

    // Footer selected message
    selectedMessage: "Seleccionado",
  };

  /* {emptyMessage: 'No data to display',totalMessage: 'total',selectedMessage: 'selected'} */
  personal: Array<Personal>;
  columns = [
    { prop: 'cdEmail', name: 'Usuario' },
    { prop: 'firstName', name: 'Nombre' },
    { prop: 'surName', name: 'Apellido Materno' },
    { prop: 'lastName', name: 'Apellido Paterno' },
    { prop: 'dsType', name: 'Role' },
    { prop: 'swActive', name: 'Estatus' },
    { prop: 'cdEmail', name: 'Acciones' }
  ];

  constructor(
    private personalSrv: PersonalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) {
    //console.log(personalSrv.)
    this.personal = new Array<Personal>();
    this.temp = new Array<Personal>();
    this.newPersonal = new Personal();

    this.getAll();
    console.log('---------', this.personal);

    this.personalForm = formBuilder.group(
      {
        'cdEmail': [null, Validators.compose([Validators.required,
        Validators.email])],
        'firstName': [null, Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z ñáéíóúüÑÁÉÍÓÚÜ]{2,25}')])],
        'surName': [null, Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z ñáéíóúüÑÁÉÍÓÚÜ]{2,25}')])],
        'lastName': [null, Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z ñáéíóúüÑÁÉÍÓÚÜ]{2,25}')])],
        'dsType': [null, Validators.required],
        'swActive': [null,Validators.required]
      }    
    );
    this.personalForm.controls['dsType'].setValue(2);
    this.personalForm.controls['swActive'].setValue('S');
    //this.table.messages=this.messages;
  }


  ngOnInit() {

  }

  chargeLanguage(lang: String) {
    if (lang = 'en') {
      console.log()
    }
  }

  getAll() {
    /*
    this.personalSrv.getAll(
      (success)=>{
        console.log(success);
        this.personal=success;
        this.temp = success;
        //this.proccessResponse(success);
      },
      (error)=>{
        console.log(error);
      }
    );*/

    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/personal.json`);

    req.onload = () => {

      //cb(JSON.parse(req.response));
      console.log('json:', req.response);
      //this.personal = JSON.parse(req.response);
      //this.temp = JSON.parse(req.response);
      this.proccessResponse(JSON.parse(req.response));
      console.log('personal:', this.personal);
    };

    req.send();
  }
  proccessResponse(rows) {
    if (rows.length === 0) {
      console.log("No rows - Response")
    }
    rows.forEach(element => {
      this.temp.push(element);
      let row = this.createRowDescription(element);
      this.personal.push(row);
    });
    this.personal = [...this.personal];
  }

  createRowDescription(row): Personal {    
    var response = {
      'cdEmail': row.cdEmail,
      'firstName': row.firstName,
      'surName': row.surName,
      'lastName': row.lastName,
      'dsType': row.dsType,
      'swActive': row.swActive
    };
    //console.log('response', response);
    return response;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {      
      return d.cdEmail.toLowerCase().indexOf(val) !== -1 || !val;
    });    
    this.personal = temp;    
    this.table.offset = 0;
  }

  markTouch() {
    console.log('touching');
    this.personalForm.controls['cdEmail'].markAsTouched();
    this.personalForm.controls['firstName'].markAsTouched();
    this.personalForm.controls['surName'].markAsTouched();
    this.personalForm.controls['lastName'].markAsTouched();
    this.personalForm.controls['dsType'].markAsTouched();
    this.personalForm.controls['swActive'].markAsTouched();
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/personal.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  savePersonal(value, success) {
    var pers;
   //console.log("save", value);
   this.markTouch(); 
   if (this.personalForm.status == 'VALID') {      
      if (this.swUpdate) {
        //console.log("se va a actualizar");
        this.personalForm.controls['cdEmail'].enable();
        //console.log("toUpdateMe", value);
        const index = this.personal.findIndex((e) => e.cdEmail === value.cdEmail);
        this.personal[index] = this.createRowDescription(value);
        this.temp[index]=value;          
      } else {
        //console.log("se va a guardar nuevo", value);
        this.personal.push(this.createRowDescription(value));
        this.temp.push(value);
        //console.log("personal", this.personal);                
      }
      this .swUpdate=false;     
      this.personal = [...this.personal];
      success.hide();
      this.clearForm();
    }else{
      console.log('el formulario no es válido');
    }
   /////////////////////No es válido - Nottificar 
  }

  goToPersonal(): void {
    this.router.navigate(['/personal']);
  }

  update(value) {
    this.swUpdate = true;
    var found = new Personal();
    found = this.temp.find(function (element) {
      return element.cdEmail == value;
    });
    console.log('toUpdate', found);
    this.personalForm.controls['cdEmail'].setValue(found.cdEmail);
    this.personalForm.controls['firstName'].setValue(found.firstName);
    this.personalForm.controls['surName'].setValue(found.surName);
    this.personalForm.controls['lastName'].setValue(found.lastName);
    this.personalForm.controls['dsType'].setValue(found.dsType);
    this.personalForm.controls['swActive'].setValue(found.swActive);    
  }

  drop(value){
    //this.swUpdate = true;
    var found = new Personal();
    found = this.temp.find(function (element) {
      return element.cdEmail == value;
    });
    found.swActive='N';
    const index = this.personal.findIndex((e) => e.cdEmail === found.cdEmail);
    this.personal[index] = this.createRowDescription(found);
    this.temp[index]=found;   
    this.personal = [...this.personal];           
  }

  clearForm(){
    this.personalForm.controls['cdEmail'].setValue('');
    this.personalForm.controls['firstName'].setValue('');
    this.personalForm.controls['surName'].setValue('');
    this.personalForm.controls['lastName'].setValue('');
    this.personalForm.controls['dsType'].setValue(2);
    this.personalForm.controls['swActive'].setValue('S');
  }
}

