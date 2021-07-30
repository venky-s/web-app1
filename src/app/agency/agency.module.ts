import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { ProspectComponent } from './prospect/prospect.component';
import { ActivitiesComponent } from './activities/activities.component';
import { DashboardComponent } from './prospect/components/dashboard/dashboard.component';
import { RegisteredProspectComponent } from './prospect/components/registered-prospect/registered-prospect.component';
import { FollowUpComponent } from './prospect/components/follow-up/follow-up.component';
import { ApplicationSubmittedComponent } from './prospect/components/application-submitted/application-submitted.component';
import { OnboardComponent } from './prospect/components/onboard/onboard.component';
import { NotIntrestedComponent } from './prospect/components/not-intrested/not-intrested.component';
import { UpcomingActivitiesComponent } from './activities/upcoming/upcoming-activities/upcoming-activities.component';
import { PassedActivitiesComponent } from './activities/passed/passed-activities/passed-activities.component';
import { DetailsActivityComponent } from './activities/shared/details-activity/details-activity.component';


import { ContentComponent } from './content/content.component';
import { BybComponent } from './content/byb/byb.component';
import { FaqComponent } from './content/faq/faq.component';
import { ScriptGuideComponent } from './content/script-guide/script-guide.component';


@NgModule({
  declarations: [
    AgencyComponent,
    ProspectComponent,
    ActivitiesComponent,
    DashboardComponent,
    RegisteredProspectComponent,
    FollowUpComponent,
    ApplicationSubmittedComponent,
    OnboardComponent,
    NotIntrestedComponent,
    UpcomingActivitiesComponent,
    PassedActivitiesComponent,
    DetailsActivityComponent,

    ContentComponent,
    BybComponent,
    FaqComponent,
    ScriptGuideComponent,
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgencyModule { }
