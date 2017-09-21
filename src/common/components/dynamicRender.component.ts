import {
  Directive,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

@Directive({ selector: 'dynamic-render' })
export class DynamicRenderComponent {
  @Input() componentType: any;

  constructor(private vcRef: ViewContainerRef, private cfr: ComponentFactoryResolver) { }

  ngOnChanges() {
    let compFactory = this.cfr.resolveComponentFactory(this.componentType);
    this.vcRef.createComponent(compFactory);
  }
}
