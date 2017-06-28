import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { DomService } from '../services/dom.service';

@Directive({ selector: '[m-fullscreen]' })
export class FullscreenDirective {
  @Input() onFullscreen: Function;
  constructor(private el: ElementRef) {}

  @HostListener("fullscreenEvent", ['$event']) onFullscreenEvent(e) {
    e.stopPropagation();

    DomService.toggleFullscreen(this.el.nativeElement);

    if (this.onFullscreen) {
      this.onFullscreen(DomService.isFullscreen());
    }
  }

  // in case user use `esc` to exit fullscreen
  @HostListener("document:fullscreenchange", ['$event'])
  @HostListener("document:webkitfullscreenchange", ['$event'])
  @HostListener("document:onmozfullscreenchange", ['$event'])
  @HostListener("document:onmsfullscreenchange", ['$event'])
  onFullscreenChange(e) {
    DomService.toggleClass(this.el.nativeElement, 'fullscreen');
  }
}

@Directive({ selector: '[m-fullscreen-trigger]' })
export class FullscreenTriggerDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.cursor = 'sw-resize';
  }

  @HostListener("click") onClick() {
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent('fullscreenEvent', true, true, "toggling");
    this.el.nativeElement.dispatchEvent(event);
  }
}
