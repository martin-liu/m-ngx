import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import * as _ from 'lodash';

import { SharedService } from './shared.service';
import { Config } from '../../app/app.config';
import { Cache } from './cache.service';

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

@Injectable()
export class AppInitService {
  promises: Array<Promise<any>> = [];

  constructor(private http: Http, private router: Router, public ss: SharedService) {
  }

  private saveUser(user) {
    let nt = user.nt || user.PF_AUTH_SUBJECT;
    let email = user.email || user.PF_AUTH_EMAIL;
    let firstName = user.firstName || user.PF_AUTH_FIRSTNAME;
    let lastName = user.lastName || user.PF_AUTH_LASTNAME;
    let displayName = user.displayName || user.PF_AUTH_DISPLAYNAME || (lastName + ', ' + firstName);
    let qid = user.qid || user.PF_AUTH_QID;

    if (nt) {
      let user = {
        nt, firstName, lastName, email, displayName, qid,
        label : displayName + '(' + nt + ')'
      }
      this.ss.user = user;
      Cache.set('user', user);
    }
  }

  public initUser() {
    let userPromise = new Promise((rs) => {
      if (!this.ss.user && Config.SSO.type == 'PFSSO') {
        let url = document.location.href + '?t=' + new Date().getTime(); // in case returning 304
        this.http.get(url)
          .subscribe((res) => {
            let user = {
              nt : res.headers.get('PF_AUTH_SUBJECT'),
              email : res.headers.get('PF_AUTH_EMAIL'),
              firstName : res.headers.get('PF_AUTH_FIRST'),
              lastName : res.headers.get('PF_AUTH_LAST'),
              displayName: res.headers.get('PF_AUTH_DISPLAYNAME'),
              qid: res.headers.get('PF_AUTH_QID')
            };
            this.saveUser(user);
            rs();
          });
      } else {
        rs();
      }
    });

    return userPromise.then(() => {
      // read cookie if not get user info
      if (!this.ss.user || !this.ss.user.nt) {
        if (Config.SSO.cookieKeys && Config.SSO.cookieKeys.length) {
          let v = Config.SSO.cookieKeys.map(getCookie);
          if (Config.SSO.cookieTransform && _.isFunction(Config.SSO.cookieTransform)) {
            try {
              v = Config.SSO.cookieTransform(v);
            } catch (e){
              console.error(e);
            }
          } else if (v && v.length && _.isString(v[0])) {
            v = { nt: v[0] };
          }

          if (v) {
            this.saveUser(v);
          }
        }
      }
    });
  }

  public init(){
    if (!this.ss.user && Config.SSO && Config.SSO.enabled) {
      this.addStep(this.initUser());
    }
  }

  public addStep(promise) {
    return this.promises.push(promise);
  }

  public done() {
    return Promise.all(this.promises);
  }
}
