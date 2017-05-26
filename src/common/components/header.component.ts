import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../app/app.config';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'm-header',
  templateUrl: './header.component.html',
  providers: [SharedService]

})
export class HeaderComponent {
  Config = Config;
  routes = Config.routes.filter(d => d.data && d.data.name)

  @Input() mailto: string;
  @Input() wiki: string;
  constructor(private router: Router, private ss: SharedService) {}
}
