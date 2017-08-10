import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var require:any;

@Component({
  selector: 'dynamic-modal',
  template: `
     <dynamic-tpl [html]="_tpl" [vm]="vm" [style]="_style"></dynamic-tpl>
`,
  providers: [NgbActiveModal]
})
export class DynamicModalComponent implements OnInit {
  @Input() vm: any;
  @Input() _tpl: string;
  @Input() _style: any;

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

  createDialog(template, scope: any = {}, options = {}, style = '') {
    const modalRef = this.modalService.open(DynamicModalComponent, options);
    scope.close = (v) => modalRef.close(v);
    scope.dismiss = (v) => modalRef.dismiss(v);
    modalRef.componentInstance.vm = scope;
    modalRef.componentInstance._tpl = template;
    modalRef.componentInstance._style = style;
    return new Promise((rs, rj) => {
      modalRef.result.then(rs)
        .catch(() => {});
    });
  }

  alert(message, type) {
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
    return this.createDialog(this.alertTpl, scope);
  }

  success(message) {
    return this.alert(message, 'success');
  }

  fail(message) {
    return this.alert(message, 'fail');
  }

  confirm(message) {
    return this.alert(message, 'confirm');
  }

  error(message) {
    let tplErrorHandler;
    tplErrorHandler = require('../partials/error_handler.html');
    return this.createDialog(tplErrorHandler, {
      message: message
    }, function() {});
  }
}
