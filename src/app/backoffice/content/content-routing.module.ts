import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { BybComponent } from './byb/byb.component';
import { BybFormComponent } from './byb-form/byb-form.component';
import { ScriptGuideComponent } from './script-guide/script-guide.component';
import { ScriptGuideFormComponent } from './script-guide-form/script-guide-form.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { 
    path: '',
    component: ContentComponent,
    children: [
      { 
        path: 'byb', 
        component: BybComponent, 
        children: [
          // { path: 'add', component: BybFormComponent },
          // { path: ':id', component: BybFormComponent }
        ]
      },
      { path: 'byb/add', component: BybFormComponent },
      { path: 'byb/:id', component: BybFormComponent },
      { 
        path: 'script-guide', 
        component: ScriptGuideComponent, 
        children: [
          // { path: 'add', component: ScriptGuideFormComponent },
          // { path: ':id', component: ScriptGuideFormComponent }
        ]
      },
      { path: 'script-guide/add', component: ScriptGuideFormComponent },
      { path: 'script-guide/:id', component: ScriptGuideFormComponent },
      { path: 'faq', component: FaqComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
