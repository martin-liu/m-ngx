import { Component } from '@angular/core';
import { Config } from '../../app/app.config';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'm-header',
  template: `
    <div headroom intro-step="2" style="min-height:45px"
         class="navbar navbar-inverse navbar-fixed-top animated slideInDown">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="navbar-brand" style="color:#fff">
            {{Config.title}}
          </a>
          <ul class="nav navbar-nav">
            <li class="float-shadow"
                ng-class="{active: ss.currentPage == route.params.name}"
                ng-click="vm.Util.redirect(route.url)"
                ng-repeat="route in Config.routes">
              <a href="" ng-bind="route.params.label"></a>
            </li>
          </ul>
          <div class="nav nav-pills pull-right" style="margin-right:20px">
            <li>
              <a style="color: #999" ng-href="{{vm.mailto}}">
                <i class="fa fa-envelope"></i></a>
            </li>
            <li>
              <a style="color: #999" ng-href="{{vm.wiki}}" target="_blank">
                <i class="fa fa-question-circle"></i>
              </a>
            </li>
            <li ng-if="Config.intro.enabled">
              <a style="color: #999" href="" target="_blank" ng-click="ss.intro.startIntro()">
                Tour
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
`,
  providers: [SharedService]

})
export class HeaderComponent {
  Config = Config

  constructor(private ss: SharedService) {}
}
