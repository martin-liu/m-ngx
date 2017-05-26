import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullscreenDirective, FullscreenTriggerDirective } from './fullscreen.directive';

@NgModule({
  declarations: [
    FullscreenDirective,
    FullscreenTriggerDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    FullscreenDirective,
    FullscreenTriggerDirective
  ]
})
export class MDirectivesModule { }
