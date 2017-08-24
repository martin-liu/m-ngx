import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    LoadingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    LoadingComponent,
    HeaderComponent
  ]
})
export class MComponentsModule { }
