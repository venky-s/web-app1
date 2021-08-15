import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { BybComponent } from './byb/byb.component';
import { FaqComponent } from './faq/faq.component';
import { ScriptGuideComponent } from './script-guide/script-guide.component';

@NgModule({
    declarations: [
      ContentComponent,
      BybComponent,
      FaqComponent,
      ScriptGuideComponent,
    ],
    imports: [
      CommonModule,
      ContentRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ]
  })
  export class ContentModule { }