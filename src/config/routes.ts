import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { NotFoundComponent } from '../common/components/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
