import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { PrivateComponent } from './core/layouts/private/private.component';
import { PublicComponent } from './core/layouts/public/public.component';

@NgModule({
  declarations: [
    AppComponent,PrivateComponent, PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
