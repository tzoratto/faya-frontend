import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'faya-more-button',
    templateUrl: 'more-button.component.html',
    styleUrls: ['more-button.component.css']
})
export class MoreButtonComponent implements OnInit, OnDestroy {
    private isOpen: boolean = false;
    private closeBind: any;

    constructor() {

    }

    open(): void {
        if (this.isOpen) {
            this.close();
        } else {
            window.document.addEventListener('click', this.closeBind, true);
            this.isOpen = true;
        }
    }

    close(): void {
        window.document.removeEventListener('click', this.closeBind, true);
        this.isOpen = false;
    }

    ngOnInit(): void {
        this.closeBind = this.close.bind(this);
    }

    ngOnDestroy(): void {
        window.document.removeEventListener('click', this.closeBind, true);
    }
}
