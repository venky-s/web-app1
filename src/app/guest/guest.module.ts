import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';

import { LoginComponent } from './login/login.component';
import { AnonymousComponent } from './anonymous/anonymous.component';


@NgModule({
  declarations: [
    GuestComponent,
    AnonymousComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
