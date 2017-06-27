import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { ForOwnPipe } from './forOwn.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    ForOwnPipe
  ],
  imports: [
  ],
  exports: [
    FilterPipe,
    ForOwnPipe
  ]
})
export class MPipesModule { }
