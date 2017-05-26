import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEchartsModule } from 'angular2-echarts';
import { RestangularModule } from 'ngx-restangular';

import { MComponentsModule } from '../common/components/components.module';
import { MDirectivesModule } from '../common/directives/directives.module';

import { Config } from './app.config';
import { AppInitService } from '../common/services/app.init.service';
import { SharedService } from '../common/services/shared.service';
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
    RouterModule.forRoot(Config.routes),

    // ng-bootstrap
    NgbModule.forRoot(),
    // echarts
    AngularEchartsModule,
    // ngx-restangular
    RestangularModule.forRoot(),

    // m modules
    MComponentsModule,
    MDirectivesModule

  ],
  providers: [
    AppInitService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
