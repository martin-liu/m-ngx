import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { NotFoundComponent } from './notfound.component';
import { DynamicTemplateComponent } from './dynamicTemplate.component';

@NgModule({
  declarations: [
    LoadingComponent,
    NotFoundComponent,
    DynamicTemplateComponent
  ],
  exports: [
    LoadingComponent,
    NotFoundComponent,
    DynamicTemplateComponent
  ]
})
export class MComponentsModule { }
