import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as echarts  from 'echarts';
import { Config }    from './app.config';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  providers: [Title]
})
export class AppComponent {
  public constructor(private titleService: Title) {
    titleService.setTitle(Config.title);
  }
}
