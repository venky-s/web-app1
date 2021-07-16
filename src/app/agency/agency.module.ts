import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { ProspectComponent } from './prospect/prospect.component';
import { MyQrComponent } from './my-qr/my-qr.component';
import { DashboardComponent } from './prospect/components/dashboard/dashboard.component';
import { RegisteredProspectComponent } from './prospect/components/registered-prospect/registered-prospect.component';
import { FollowUpComponent } from './prospect/components/follow-up/follow-up.component';
import { ApplicationSubmittedComponent } from './prospect/components/application-submitted/application-submitted.component';
import { OnboardComponent } from './prospect/components/onboard/onboard.component';
import { NotIntrestedComponent } from './prospect/components/not-intrested/not-intrested.component';


@NgModule({
  declarations: [
    AgencyComponent,
    ProspectComponent,
    MyQrComponent,
    DashboardComponent,
    RegisteredProspectComponent,
    FollowUpComponent,
    ApplicationSubmittedComponent,
    OnboardComponent,
    NotIntrestedComponent,
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    FormsModule
  ]
})
export class AgencyModule { }
