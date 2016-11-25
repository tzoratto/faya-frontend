import {Directive, ElementRef, Output, EventEmitter, Input, OnInit, OnDestroy} from '@angular/core';
import Clipboard = require('clipboard');

@Directive({
    selector: '[fayaClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    private clipboard: any;
    @Input()
    textToCopy: string;
    @Output()
    onCopy = new EventEmitter<boolean>();

    constructor(private elmRef: ElementRef) {

    }

    ngOnInit(): void {
        this.clipboard = new Clipboard(this.elmRef.nativeElement, {
            text: () => {
                return this.textToCopy;
            }
        });
        this.clipboard.on('success', () => this.onCopy.emit(true));
        this.clipboard.on('error', () => this.onCopy.emit(false));
    }

    ngOnDestroy(): void {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
}
