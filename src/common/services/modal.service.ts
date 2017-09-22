import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alert-modal',
  templateUrl: '../partials/alert.html'
})
export class AlertModalComponent {
  @Input() title: string;
  @Input() type: string;
  @Input() message: string;
  @Input() class: string;
  @Input() close: Function;
  @Input() dismiss: Function;
}

@Component({
  selector: 'error-modal',
  templateUrl: '../partials/error_handler.html'
})
export class ErrorHandlerModalComponent {
  @Input() message: string;
  @Input() close: Function;
  @Input() dismiss: Function;
}

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal){}

  alert(message, type, title) {
    const modalRef = this.modalService.open(AlertModalComponent, {});

    let mclass = (function() {
      switch (type) {
      case 'success':
        return 'alert-success';
      case 'fail':
        return 'alert-danger';
      case 'confirm':
        return 'alert-warning';
      }
    })();

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.class = mclass;
    modalRef.componentInstance.close = (v) => modalRef.close(v);
    modalRef.componentInstance.dismiss = (v) => modalRef.dismiss(v);

    return new Promise((rs, rj) => {
      modalRef.result.then(rs)
        .catch(() => {});
    });
  }

  success(message, title = 'Success!') {
    return this.alert(message, 'success', title);
  }

  fail(message, title = 'Fail!') {
    return this.alert(message, 'fail', title);
  }

  confirm(message, title = 'Confirm!') {
    return this.alert(message, 'confirm', title);
  }

  error(message) {
    const modalRef = this.modalService.open(ErrorHandlerModalComponent, {});
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.close = (v) => modalRef.close(v);
    modalRef.componentInstance.dismiss = (v) => modalRef.dismiss(v);
    return new Promise((rs, rj) => {
      modalRef.result.then(rs)
        .catch(() => {});
    });
  }
}
