import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Config } from './app/app.config';
import { AppInitService } from './common/services/app.init.service';

if (Config.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
  let injector = module.injector;
  let appInit = injector.get(AppInitService);

  // can add any step(promise) here for application initialization
  appInit.addStep(new Promise(rs => rs()));

  appInit.init();
  return injector;
});
