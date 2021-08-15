import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { ApplicationSubmittedComponent } from './components/application-submitted/application-submitted.component';

const routes: Routes = [
  { 
    path: "", component: SurveyComponent,
    children: [
      { path: '', component: SurveyFormComponent },
      { path: 'submitted', component: ApplicationSubmittedComponent},
      { path: 'submitted/:refid', component: ApplicationSubmittedComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
