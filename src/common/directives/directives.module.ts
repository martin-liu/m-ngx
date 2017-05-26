import { NgModule } from '@angular/core';
import { FullscreenDirective, FullscreenTriggerDirective } from './fullscreen.directive';

@NgModule({
  declarations: [
    FullscreenDirective,
    FullscreenTriggerDirective
  ],
  exports: [
    FullscreenDirective,
    FullscreenTriggerDirective
  ]
})
export class MDirectivesModule { }
