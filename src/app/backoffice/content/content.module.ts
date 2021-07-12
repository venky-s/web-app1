import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { BybComponent } from './byb/byb.component';
import { ScriptGuideComponent } from './script-guide/script-guide.component';
import { FaqComponent } from './faq/faq.component';
import { ScriptGuideFormComponent } from './script-guide-form/script-guide-form.component';
import { BybFormComponent } from './byb-form/byb-form.component';

@NgModule({
  declarations: [
    ContentComponent,
    BybComponent,
    ScriptGuideComponent,
    ScriptGuideFormComponent,
    FaqComponent,
    BybFormComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
