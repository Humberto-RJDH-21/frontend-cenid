import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemesterRoutingModule } from './semester-routing.module';
import { SemesterComponent } from './semester/semester.component';
import { NivelComponent } from './nivel/nivel.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    CommonModule,
    SemesterRoutingModule
  ],
  declarations: [SemesterComponent, NivelComponent, GroupComponent]
})
export class SemesterModule { }
