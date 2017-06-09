import { Component } from '@angular/core';
import { Config } from '../app/app.config';
import { NProgressService } from './services/nprogress.service';
import { Util } from './services/util.service';
import { AppInitService } from './services/app.init.service';
import { SharedService } from './services/shared.service';
import { PiwikService } from './services/piwik.service';
import { appInjectorPromise } from '../main';

export class BasePageComponent {
  ss: SharedService;
  data: any = {};
  state: any = {};

  constructor() {
    appInjectorPromise.then((injector) => {
      let appInit = injector.get(AppInitService);
      this.ss = appInit.ss;
      appInit.done()
        .then(() => this.pageInit(this.ss))
        .then(() => this.bindView());

      if (!Config.production) {
        window['vm'] = this;
      }
    });
  }

  initialize() {
    return new Promise(rs => rs());
  }

  bindView() {}

  pageInit(ss){
    return new Promise( (resolve) => {
      NProgressService.start();
      ss.pageInitialized = false;
      this.initialize().then(() => {
        ss.pageInitialized = true;
        NProgressService.done();
        // Intro
        if (Config.intro.enabled) {
          ss.intro.init();
        }
        // Piwik
        if (Config.piwik.enabled && ss.user) {
          PiwikService.init(ss.user.nt, ss.currentPageTrackingName || ss.currentPage);
        }
        resolve();
      });
    });
  }
}
