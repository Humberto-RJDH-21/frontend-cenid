import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterComponent } from './semester/semester.component';

const routes: Routes = [
  {
    path:'',
    component: SemesterComponent,
    data: {
      title: 'Semestre'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemesterRoutingModule { }
