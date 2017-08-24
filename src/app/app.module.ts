import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InjectorService } from '../common/services/injector.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEchartsModule } from 'angular2-echarts';
import { RestangularModule } from 'ngx-restangular';
import { DragulaModule } from 'ng2-dragula';

import { MComponentsModule } from '../common/components/components.module';
import { MDirectivesModule } from '../common/directives/directives.module';
import { MPipesModule } from '../common/pipes/pipes.module';

import { Config } from './app.config';
import { routes } from '../config/routes';
import { AppInitService } from '../common/services/app.init.service';
import { SharedService } from '../common/services/shared.service';
import { DynamicTemplateComponent } from '../common/components/dynamicTemplate.component';
import { DynamicModalComponent } from '../common/services/modal.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';

export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(Config.uri.api);
}

@NgModule({
  declarations: [
    DynamicTemplateComponent,
    DynamicModalComponent,
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent
  ],
  // for dynamic create
  entryComponents: [
    DynamicModalComponent
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
