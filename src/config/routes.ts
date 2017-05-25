import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { AboutComponent } from '../app/about/about.component';
import { NotFoundComponent } from '../app/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      name: "Home",
      trackingName: "Home Page"   //  this is for tracking(piwik) usage
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      name: "About Page"
    }

  },
  { path: '**', component: NotFoundComponent }
];
