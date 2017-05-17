import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Config } from './app/app.config';

if (Config.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
