import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { ProspectComponent } from './prospect/prospect.component';
import { MyQrComponent } from './my-qr/my-qr.component';

const routes: Routes = [
  { 
    path: '', 
    component: AgencyComponent,
    children: [
      { path: '', component: ProspectComponent },
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
