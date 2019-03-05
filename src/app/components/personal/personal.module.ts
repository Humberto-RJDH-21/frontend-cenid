import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalTableComponent } from './personal-table/personal-table.component';
import { PersonalComponent } from './personal.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GridModule } from '@progress/kendo-angular-grid';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    PersonalRoutingModule,
    //GridModule
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [PersonalTableComponent, PersonalComponent]
})
export class PersonalModule { }
