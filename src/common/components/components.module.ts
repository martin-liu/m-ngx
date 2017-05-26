import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { HeaderComponent } from './header.component';
import { DynamicTemplateComponent } from './dynamicTemplate.component';

@NgModule({
  declarations: [
    LoadingComponent,
    HeaderComponent,
    DynamicTemplateComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    LoadingComponent,
    HeaderComponent,
    DynamicTemplateComponent
  ]
})
export class MComponentsModule { }
