import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';

import { RouterModule }  from '@angular/router';
import { CommonModule } from '@angular/common';
import { MComponentsModule } from './components.module';
import { AppModule } from '../../app/app.module';

export function createComponentFactory(compiler: Compiler, metadata: Component, vm: any): Promise<ComponentFactory<any>> {
  const cmpClass = class DynamicTemplateComponent {
    ngOnInit() {
      for (let k in vm) {
        this[k] = vm[k]
      }
    }
  };
  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({ imports: [CommonModule, RouterModule, AppModule, MComponentsModule], declarations: [decoratedCmp] })
  class DynamicHtmlModule { }

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
    });
}

@Directive({ selector: 'dynamic-tpl' })
export class DynamicTemplateComponent {
  @Input() html: string;
  @Input() vm: any;
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) { }

  ngOnChanges() {
    const html = this.html;
    if (!html) return;

    if(this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-tpl',
      template: this.html,
    });

    createComponentFactory(this.compiler, compMetadata, this.vm)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      });
  }

  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
