import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { BybComponent } from './byb/byb.component';
import { FaqComponent } from './faq/faq.component';
import { ScriptGuideComponent } from './script-guide/script-guide.component';

const routes: Routes = [
    { 
      path: '',
      component: ContentComponent,
      children: [
        { path: '', component: BybComponent },
        { path: 'byb', component: BybComponent },
        { path: 'script-guide', component: ScriptGuideComponent },
        { path: 'faq', component: FaqComponent },
      ]
    }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContentRoutingModule { }