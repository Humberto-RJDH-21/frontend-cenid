import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { UsersComponent } from './users/users.component';
import { PersonalModule } from './personal/personal.module';
import { PersonalComponent } from './personal/personal.component';
import { PersonalTableComponent } from './personal/personal-table/personal-table.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,    
  ],
  declarations: [UsersComponent]
})
export class ComponentsModule { }
