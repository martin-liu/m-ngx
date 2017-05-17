import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-loading',
  template: `
    <div class="loading">
      <i class="fa fa-spinner fa-spin pull-left"></i>
      <h4>{{text || 'Loading...'}}</h4>
    </div>
`
})
export class LoadingComponent {
  @Input() text: String;
}
