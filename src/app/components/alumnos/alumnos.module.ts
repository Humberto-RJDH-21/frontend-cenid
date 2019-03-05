import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosTableComponent } from './alumnos-table/alumnos-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),    
    AlertModule.forRoot()
  ],
  declarations: [AlumnosComponent, AlumnosTableComponent]
})
export class AlumnosModule { }
