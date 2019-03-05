import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionesRoutingModule } from './calificaciones-routing.module';
import { EvaluationsComponent } from './evaluations/evaluations.component';

@NgModule({
  imports: [
    CommonModule,
    CalificacionesRoutingModule
  ],
  declarations: [EvaluationsComponent]
})
export class CalificacionesModule { }
