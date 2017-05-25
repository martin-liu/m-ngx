import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { DynamicTemplateComponent } from './dynamicTemplate.component';

@NgModule({
  declarations: [
    LoadingComponent,
    DynamicTemplateComponent
  ],
  exports: [
    LoadingComponent,
    DynamicTemplateComponent
  ]
})
export class MComponentsModule { }
