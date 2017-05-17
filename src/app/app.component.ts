import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as echarts  from 'echarts';
import { Config }    from './app.config';
import { ModalService }      from '../common/services/modal.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  providers: [Title, ModalService]
})
export class AppComponent {
  public constructor(private titleService: Title, private modalService: ModalService) {
    titleService.setTitle(Config.title);
    modalService.fail('haha')
  }
}
