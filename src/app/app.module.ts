import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptService } from '../service/script.service';

import { AwaiterService } from '../service/awaiter.service';
import { AwaiterInterceptor } from '../service/awaiter.interceptor';
import { AwaitingComponent } from './awaiting/awaiting.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    AwaitingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ScriptService,
    AwaiterService,
    { provide: HTTP_INTERCEPTORS, useClass: AwaiterInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
