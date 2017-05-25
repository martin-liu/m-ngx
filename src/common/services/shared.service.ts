import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Util } from './util.service';
import { IntroService } from './intro.service';
import { Cache } from './cache.service';
import { Config } from '../../app/app.config';

let singleton = null;

@Injectable()
export class SharedService {
  user: any = Cache.get('user');     // if not in cache, AppInitService will try to load user info
  pageInitialized: boolean = false;  // if page initialized
  currentPage: string;               // current page name
  currentPageTrackingName: string;   // page name for tracking

  util = Util;
  intro = new IntroService();
  config = Config;
  dict = {
    get : (key) => {
      key = _.trim(key);
      let ret = this.config.Constant.dict[key] || key;
      return ret;
    }
  }

  persistence: any = this.setUpPersistence(`${Config.name}_persistence_object`);
  session: any = this.setUpPersistence(`${Config.name}_session_object`, true);

  setUpPersistence(key, isSession = false) {
    let cache = Cache;
    if (isSession) {
      cache = Cache.session;
    }

    let obj = cache.get(key) || {};

    let proxyHandler: ProxyHandler<any> = {
      set: (target, property, value, receiver) => {
        target[property] = value;
        cache.set(key, target);
        return true;
      }
    };

    return new Proxy(obj, proxyHandler);
  }

  constructor() {
    // TODO find a better way for singleton
    if (!singleton) {
      singleton = this;
    }
    return singleton;
  }

}
