import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import { Config } from '../app/app.config';
import { Util } from './services/util.service';

import { HashService } from './services/hash.service';

@Injectable()
export class BaseRemoteService {
  protected rest: Restangular;

  constructor(private restangular: Restangular){
    this.rest = this.getRest(restangular);
  }

  protected getRest(Restangular){
    return Restangular.all('');
  }

  private getCacheKey(method, param) {
    let classMatch = /function\s+(\w+)\(.*\).*/.exec(this.constructor.toString());
    let className;
    if (classMatch.length == 2) {
      className = classMatch[1];
    }
    return `${Config.name}_${className}_${method}_${HashService.hash(param)}`;
  }

  // Session cache
  getWithCache(method, param, func, timeout = 300) {
    return Util.getWithCache(this.getCacheKey(method, param), true, func, timeout);
  }

  doQuery(method, param, canceler?) {
    if (canceler && canceler.then) {
      return this.rest.one(method).get(param).flatMap(d => Observable.fromPromise(new Promise((rs, rj) => {
        canceler.then(() => rj('request cancelled!'));

        // ensure it runs async
        setTimeout(() => rs(d), 0);
      })));
    } else {
      return this.rest.one(method).get(param);
    }
  }

  doQueryWithCache(method, param, canceler = null, timeout = 300){
    return Observable.fromPromise(this.getWithCache(method, param, () => {
      return this.doQuery(method, param, canceler).toPromise();
    }, timeout));
  }

  mockResult(data, time = 1000){
    return Observable.fromPromise(new Promise((rs, rj) => {
      setTimeout(() => rs(data), time);
    }));
  }
}
