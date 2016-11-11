import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {ModalService} from './modal.service';


@Component({
    selector: 'faya-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css']
})
export class ModalComponent implements OnInit {
    @ViewChild('staticModal') modal: ModalDirective;
    private message: string;
    private onValidationCallback = () => {};
    private onCancellationCallback = () => {};

    constructor(private modalService: ModalService) {

    }

    ngOnInit(): void {
        this.modalService.message.subscribe(value => {
            this.message = value.message;
            this.onValidationCallback = value.onValidation ? value.onValidation : () => {};
            this.onCancellationCallback = value.onCancellation ? value.onCancellation : () => {};
            this.modal.show();
        });
    }

    onValidation() {
        this.modal.hide();
        this.onValidationCallback();
    }

    onCancellation() {
        this.modal.hide();
        this.onCancellationCallback();
    }
}
