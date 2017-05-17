import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var require:any;

@Component({
  selector: 'dynamic-modal',
  template: `
11111<dynamic-tpl [html]="_tpl"></dynamic-tpl>
`,
  providers: [NgbActiveModal]
})
export class DynamicModalComponent implements OnInit {
  @Input() vm: any;
  @Input() _tpl: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    for (let k in this.vm) {
      this[k] = this.vm[k]
    }
  }
}

@Injectable()
export class ModalService {
  private alertTpl = require('../partials/alert.html');

  constructor(private modalService: NgbModal){}

  createDialog(template, scope, thenFunc, options = {}) {
    Reflect['getMetadata']('annotations', DynamicModalComponent)[0].template = template;
    const modalRef = this.modalService.open(DynamicModalComponent);
    modalRef.componentInstance.vm = scope;
    modalRef.componentInstance._tpl = template;
    modalRef.result.then(thenFunc);
    return modalRef;
  }

  alert(message, type, thenFunc?) {
    let mclass, scope;
    mclass = (function() {
      switch (type) {
      case 'success':
        return 'alert-success';
      case 'fail':
        return 'alert-danger';
      case 'confirm':
        return 'alert-warning';
      }
    })();
    scope = {
      message: message,
      type: type,
      "class": mclass
    };
    return this.createDialog(this.alertTpl, scope, thenFunc);
  }

  success(message, thenFunc?) {
    return this.alert(message, 'success', thenFunc);
  }

  fail(message, thenFunc?) {
    return this.alert(message, 'fail', thenFunc);
  }

  confirm(message, thenFunc?) {
    return this.alert(message, 'confirm', thenFunc);
  }

  error(message) {
    let tplErrorHandler;
    tplErrorHandler = 'partials/modal/error_handler.html';
    return this.createDialog(tplErrorHandler, {
      message: message
    }, function() {});
  }
}
