import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './personal.component';


const routes: Routes = [
  {
    path:'',
    component: PersonalComponent,
    data: {
      title: 'Personal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
