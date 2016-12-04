import {Directive, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import Clipboard = require('clipboard');
import {MessageService} from '../../core/message/message.service';

@Directive({
    selector: '[fayaClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    private clipboard: any;
    @Input()
    textToCopy: string;

    constructor(private elmRef: ElementRef,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.clipboard = new Clipboard(this.elmRef.nativeElement, {
            text: () => {
                return this.textToCopy;
            }
        });
        this.clipboard.on('success', () => {
            this.messageService.addAlertAndTranslate({
                key: 'misc.copyToClipboardSuccess',
                variables: {text: this.textToCopy}
            });
        });
        this.clipboard.on('error', () => {
            this.messageService.addAlertAndTranslate({
                key: 'misc.copyToClipboardError',
                variables: {text: this.textToCopy}
            }, 'danger');
        });
    }

    ngOnDestroy(): void {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
}
