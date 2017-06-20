import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import { Config } from '../app/app.config';
import { Util } from './services/util.service';

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
    return `${Config.name}_${className}_${method}_${JSON.stringify(param)}`;
  }

  // Session cache
  getWithCache(method, param, func, timeout = 300) {
    return Util.getWithCache(this.getCacheKey(method, param), true, func, timeout);
  }

  doQuery(method, param, canceler?) {
    if (canceler && canceler.promise) {
      let config = {timeout: canceler.promise};
      return this.rest.one(method).withHttpConfig(config).get(param);
    } else {
      return this.rest.one(method).get(param);
    }
  }

  doQueryWithCache(method, param, canceler = null, timeout = 300){
    return this.getWithCache(method, param, () => {
      if (canceler && canceler.promise) {
        let config = {timeout: canceler.promise};
        return this.rest.one(method).withHttpConfig(config).get(param);
      } else {
        return this.rest.one(method).get(param);
      }
    }, timeout);
  }

  mockResult(data, time = 1000){
    return Observable.fromPromise(new Promise((rs, rj) => {
      setTimeout(() => rs(data), time);
    }));
  }
}
