import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';

const routes: Routes = [
  {
    path:'',
    component: AlumnosComponent,
    data: {
      title: 'Alumnos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
