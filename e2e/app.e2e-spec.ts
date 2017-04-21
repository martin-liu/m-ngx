import { AngularExplorePage } from './app.po';

describe('angular-explore App', () => {
  let page: AngularExplorePage;

  beforeEach(() => {
    page = new AngularExplorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
