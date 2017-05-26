import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import * as echarts  from 'echarts';
import { Config }    from './app.config';
import { SharedService } from '../common/services/shared.service';

@Component({
  selector: 'app-root',
  template: `
<m-header [mailto]="'#'" [wiki]="'#'"></m-header>
<div [ngStyle]="{'opacity': ss.pageInitialized ? 1 : 0}">
  <router-outlet></router-outlet>
</div>
`,
  providers: [Title, SharedService]
})
export class AppComponent {
  public constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private ss: SharedService) {
    titleService.setTitle(Config.title);
  }

  ngOnInit() {
    // get current router and set to shared service
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => {
        return this.activatedRoute;
      })
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(d => {
        this.ss.currentPage = d.name;
        this.ss.currentPageTrackingName = d.trackingName;
      });
  }
}
