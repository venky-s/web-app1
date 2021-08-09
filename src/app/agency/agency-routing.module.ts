import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

import { ContentComponent } from './content/content.component';

import { BybComponent } from './content/byb/byb.component';
import { FaqComponent } from './content/faq/faq.component';
import { ScriptGuideComponent } from './content/script-guide/script-guide.component';
import { SurveyFormComponent } from '../guest/survey-form/survey-form.component';


const routes: Routes = [
  { 
    path: '', component: AgencyComponent,
    children: [
      { path: '', component: ContentComponent,
      children: [
        { path: '', component: BybComponent },
        { path: 'script-guide', component: ScriptGuideComponent },
        { path: 'faq', component: FaqComponent },
      ] 
      },
      { path: 'prospect', 
        component: ProspectComponent,    
          children: [
            { path: '', component: DashboardComponent},
            { path: 'registered-prospect', component: RegisteredProspectComponent},
            { path: 'follow-up', component: FollowUpComponent},
            { path: 'application-submitted', component: ApplicationSubmittedComponent},
            { path: 'onboard', component: OnboardComponent},
            { path: 'not-intrested', component: NotIntrestedComponent},
          ]     
      },  
      { path: 'activities', component: ActivitiesComponent,
        children: [
          { path: '', component: UpcomingActivitiesComponent},
          { path: 'passed', component: PassedActivitiesComponent}
        ] 
      },
      { path: 'survery', component: SurveyFormComponent }
    ]}    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
