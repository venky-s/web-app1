import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { ProspectComponent } from './prospect/prospect.component';
import { MyQrComponent } from './my-qr/my-qr.component';
import { DashboardComponent } from './prospect/components/dashboard/dashboard.component';
import { RegisteredProspectComponent } from './prospect/components/registered-prospect/registered-prospect.component';
import { FollowUpComponent } from './prospect/components/follow-up/follow-up.component';
import { ApplicationSubmittedComponent } from './prospect/components/application-submitted/application-submitted.component';
import { OnboardComponent } from './prospect/components/onboard/onboard.component';
import { NotIntrestedComponent } from './prospect/components/not-intrested/not-intrested.component';

const routes: Routes = [
  { 
    path: '', 
    component: AgencyComponent,
    children: [
      { path: '', component: ProspectComponent,
      children: [
        { path: '', component: DashboardComponent},
        { path: 'registered-prospect', component: RegisteredProspectComponent},
        { path: 'follow-up', component: FollowUpComponent},
        { path: 'application-submitted', component: ApplicationSubmittedComponent},
        { path: 'onboard', component: OnboardComponent},
        { path: 'not-intrested', component: NotIntrestedComponent},
      ]
      },
      { path: 'content', loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
      { path: 'my-qr', component: MyQrComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
