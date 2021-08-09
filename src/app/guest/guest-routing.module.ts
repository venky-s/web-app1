import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest.component';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { LoginComponent } from './login/login.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';

const routes: Routes = [
  { 
    path: "", component: GuestComponent,
    children: [
      { path: "", component:AnonymousComponent },
      { path: "login", component:LoginComponent },
      { path: 'survery-form', component: SurveyFormComponent }  
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
