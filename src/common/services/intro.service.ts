import * as _ from 'lodash';
import { Config } from '../../app/app.config';
import { Cache } from './cache.service';
declare var require:any;
const introJs = require('intro.js').introJs;

export class IntroService {
  private static intro;
  private cacheKey:string;

  constructor(){
    this.cacheKey = `${Config.name}_IntroService_init`;
  }

  private initIntro(container = document) {
    let steps = Config.intros;

    let els = container.querySelectorAll('[intro-step]');
    steps = _.map(steps, (step:any, i) => {
      let findEl = _.find(els, (el) => {
        let num = el.getAttribute('intro-step');
        return i == parseInt(num) - 1;
      });
      if (findEl) {
        step.element = findEl;
      }
      return step;
    });

    IntroService.intro = introJs();
    IntroService.intro.setOptions({steps});

    /*
     * refresh after change to prevent position:fixed issue
     * position:fixed may cause calculation of position not correct
     * FIXME: this seems not work in Firefox
     */
    IntroService.intro.onafterchange((targetElement) => {
      IntroService.intro.refresh();
    });
  }

  public init() {
    // Initial introducing
    this.initIntro();
    let isInit = Cache.get(this.cacheKey);
    if (!isInit) {
      setTimeout(()=>{
        if (this.start()) {
          Cache.set(this.cacheKey, true);
        }
      }, 1500);
    }
  }

  public start() {
    if (IntroService.intro) {
      IntroService.intro.start();
      return true;
    } else {
      return false;
    }
  }
}
