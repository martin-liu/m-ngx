import { Injectable } from '@angular/core';
import { BaseRemoteService } from '../../../common/base.remote.service';
import { Config } from '../../app.config';

@Injectable()
export class TestRemoteService extends BaseRemoteService {

  getRest(Restangular) {
    return Restangular.all('test');
  }

  testMethod(param, canceler?) {
    return this.doQuery('test', param, canceler);
  }

  testWithCache(param, timeout = 300) {
    return this.doQueryWithCache('test', param, null, timeout);
  }
}
