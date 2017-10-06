import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InjectorService } from '../common/services/injector.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEchartsModule } from 'ngx-echarts';
import { RestangularModule } from 'ngx-restangular';
import { DragulaModule } from 'ng2-dragula';

import { MComponentsModule } from '../common/components/components.module';
import { MDirectivesModule } from '../common/directives/directives.module';
import { MPipesModule } from '../common/pipes/pipes.module';

import { Config } from './app.config';
import { routes } from '../config/routes';
import { AppInitService } from '../common/services/app.init.service';
import { SharedService } from '../common/services/shared.service';
import { DynamicRenderComponent } from '../common/components/dynamicRender.component';
import { AlertModalComponent, ErrorHandlerModalComponent } from '../common/services/modal.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';

// Raven
import * as Raven from 'raven-js';
let raven;
if (Config.raven && Config.raven.enabled && Config.raven.url) {
  raven = Raven
    .config(Config.raven.url)
    .install();
}
export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    err = err.originalError || err;
    if (raven) {
      raven.captureException(err);
    }
    console.error(err);
  }
}

export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(Config.uri.api);
  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status >= 500) {
      // raven integration for ajax call failures
      if (raven) {
        raven.captureException(response);
      }
    }
    return true; // error not handled
  });
}

const declarations = [
  DynamicRenderComponent,
  AlertModalComponent,
  ErrorHandlerModalComponent,
  AppComponent,
  HomeComponent,
  AboutComponent,
  NotFoundComponent
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [
    AlertModalComponent,
    ErrorHandlerModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

    // ng-bootstrap
    NgbModule.forRoot(),
    // echarts
    AngularEchartsModule,
    // ngx-restangular
    RestangularModule.forRoot(RestangularConfigFactory),

    // dragula
    DragulaModule,

    // m modules
    MComponentsModule,
    MDirectivesModule,
    MPipesModule

  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: RavenErrorHandler
    },
    AppInitService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorService.injector = this.injector;
  }
}
