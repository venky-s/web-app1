import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';


@NgModule({
  declarations: [
    AgencyComponent,
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    FormsModule
  ]
})
export class AgencyModule { }
