import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { PersonalTableComponent } from './personal/personal-table/personal-table.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  {
    path:'',
    component: UsersComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
