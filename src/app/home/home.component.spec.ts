import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AppModule } from '../app.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        AppModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render modal examples', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.debugElement.nativeElement;
    let buttonText = compiled.querySelector('button').textContent;
    expect(buttonText).toEqual('Success');
  }));

  it(`should have persistence value`, async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.ss.persistence.test).toEqual({a: 1});
  }));

});
