import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateComponent } from './layouts/private/private.component';
import { PublicComponent } from './layouts/public/public.component';

@NgModule({
  declarations: [
    PrivateComponent,
    PublicComponent
  ],
  imports: [
    BrowserAnimationsModule,
  ]
})
export class CoreModule { }
