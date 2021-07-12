import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptService } from '../service/script.service';

import { AwaiterService } from '../service/awaiter.service';
import { AwaiterInterceptor } from '../service/awaiter.interceptor';
import { AwaitingComponent } from './awaiting/awaiting.component';

@NgModule({
  declarations: [
    AppComponent,
    AwaitingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ScriptService,
    AwaiterService,
    { provide: HTTP_INTERCEPTORS, useClass: AwaiterInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
