declare var require: any;
const NProgress = require('nprogress');

export class NProgressService {
  static start() {
    if ("undefined" != typeof NProgress){
      NProgress.start();
    }
  }

  static done() {
    if ("undefined" != typeof NProgress){
      setTimeout(()=> NProgress.done(), 1000);
    }
  }
}
