import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-table',
  templateUrl: './alumnos-table.component.html',
  styleUrls: ['./alumnos-table.component.scss']
})
export class AlumnosTableComponent implements OnInit {
  @ViewChild('myTable') table: any;
  public successModal;
  rows: any[] = [];

  swUpdate: boolean;
  existAlumno: boolean;
  alumnoForm: FormGroup;
  temp: any;
  temp2: any;
  filter1: any;
  filter2: any;
  filter3: any;
  expanded: any = {};
  timeout: any;
  messages = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: "No data to display",
    // Footer total message
    totalMessage: "total",
    // Footer selected message
    selectedMessage: "selected",
  };

  alumnos: Array<Alumno>;
  columns = [
    { prop: 'cdMatricula', name: 'Matrícula' },
    { prop: 'firstName', name: 'Nombre' },
    { prop: 'surName', name: 'Apellido Materno' },
    { prop: 'lastName', name: 'Apellido Paterno' },
    { prop: 'cdLic', name: 'Licenciatura' },
    { prop: 'cdNivel', name: 'Nivel' },
    { prop: 'swActive', name: 'Estatus' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.alumnos = new Array<Alumno>();
    this.temp = new Array<Alumno>();
    this.temp2 = new Array<Alumno>();
    this.getAll();
    this.temp2 = this.temp;
    this.alumnos = [...this.alumnos];
    this.swUpdate = false;
    this.alumnoForm = formBuilder.group(
      {
        'cdMatricula': [null, Validators.compose([Validators.required,
        Validators.minLength(10), Validators.maxLength(10)])],
        'firstName': [null, Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z ñáéíóúüÑÁÉÍÓÚÜ]{2,25}')])],
        'surName': [null, Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z ñáéíóúüÑÁÉÍÓÚÜ]{2,25}')])],
        'lastName': [null, Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z ñáéíóúüÑÁÉÍÓÚÜ]{2,25}')])],
        'cdLic': [null, Validators.required],
        'cdNivel': [null, Validators.required],
        'swActive': [null, Validators.compose([Validators.required])]
      }
    );
    this.alumnoForm.controls['cdLic'].setValue('01');
    this.alumnoForm.controls['cdNivel'].setValue(1);
    this.alumnoForm.controls['swActive'].setValue('S');

  }

  ngOnInit() {
  }

  getAll() {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/alumnos.json`);

    req.onload = () => {
      //console.log('json:', req.response);
      this.proccessResponse(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event, option) {

    this.temp = this.temp2;
    console.log("Entra");

    const val = event.target.value;

    console.log(val, 'temp:', this.temp);
    if (option == 1) {
      const temp = this.temp.filter(function (d) {
        return d.cdLic.indexOf(val) !== -1 || !val;
      });
      this.alumnos = temp;
    } else if (option == 2) {
      const temp1 = this.temp.filter(function (d) {
        return d.dsNivel.indexOf(val) !== -1 || !val;
      });
      this.alumnos = temp1;
    } else if (option == 3) {
      const temp2 = this.temp.filter(function (d) {
        return d.cdMatricula.indexOf(val) !== -1 || !val;
      });
      this.alumnos = temp2;
    }
    this.alumnos = [...this.alumnos];
    this.table.offset = 0;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  proccessResponse(rows) {
    if (rows.length === 0) {
      console.log("No rows - Response")
    }
    rows.forEach(element => {
      this.temp.push(element);
      let row = this.createRowDescription(element);
      this.alumnos.push(row);
    });
    this.alumnos = [...this.alumnos];
  }

  createRowDescription(row): Alumno {
    var response = row;
    //response.cdLic = 'Informática';
    //console.log('response', response);
    return response;
  }

  markTouch() {
    this.alumnoForm.controls['cdMatricula'].markAsTouched();
    this.alumnoForm.controls['firstName'].markAsTouched();
    this.alumnoForm.controls['surName'].markAsTouched();
    this.alumnoForm.controls['lastName'].markAsTouched();
    this.alumnoForm.controls['cdLic'].markAsTouched();
    this.alumnoForm.controls['cdNivel'].markAsTouched();
    this.alumnoForm.controls['swActive'].markAsTouched();
  }

  clearForm() {

  }

  saveAlumno(value, successModal) {
    console.log('to save', value)
    this.markTouch();
    if (this.alumnoForm.status == 'VALID') {
      if (this.swUpdate) {
        this.alumnoForm.controls['cdMatricula'].enable();
        const index = this.alumnos.findIndex((e) => e.cdMatricula === value.cdMatricula);
        this.alumnos[index] = this.createRowDescription(value);
        this.temp[index] = value;
      } else {
        const index = this.alumnos.findIndex((e) => e.cdMatricula === value.cdMatricula);
        console.log('index', index)
        if (index != -1) {
          console.log('ya existe la matrícula');
          this.existAlumno = true;
        } else {
          this.existAlumno=false;
          this.alumnos.push(this.createRowDescription(value));
          this.temp.push(value);
        }
      }
      if (!this.existAlumno) {
        this.swUpdate = false;
        this.alumnos = [...this.alumnos];
        successModal.hide();
        this.clearForm();
      }
    } else {
      console.log('el formulario no es válido');
    }
  }

  update(value) {
    this.swUpdate = true;
    var found = new Alumno();
    found = this.temp.find(function (element) {
      return element.cdMatricula == value;
    });

    console.log('toUpdate', found);
    this.alumnoForm.controls['cdMatricula'].setValue(found.cdMatricula);
    this.alumnoForm.controls['firstName'].setValue(found.firstName);
    this.alumnoForm.controls['surName'].setValue(found.surName);
    this.alumnoForm.controls['lastName'].setValue(found.lastName);
    this.alumnoForm.controls['cdLic'].setValue(found.cdLic);
    this.alumnoForm.controls['cdNivel'].setValue(found.cdNivel);
    this.alumnoForm.controls['swActive'].setValue(found.swActive);
  }
}
