import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { ProspectComponent } from './prospect/prospect.component';
import { MyQrComponent } from './my-qr/my-qr.component';


@NgModule({
  declarations: [
    AgencyComponent,
    ProspectComponent,
    MyQrComponent,
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    FormsModule
  ]
})
export class AgencyModule { }
