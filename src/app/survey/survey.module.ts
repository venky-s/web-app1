import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../app.module';
import { SurveyRoutingModule } from './survey-routing.module';

import { SurveyComponent } from './survey.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { ApplicationSubmittedComponent } from './components/application-submitted/application-submitted.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyFormComponent,
    ApplicationSubmittedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurveyRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    })
  ]
})
export class SurveyModule { }
