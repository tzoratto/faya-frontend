import {Injectable, EventEmitter} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Message} from '../../utils/message';

@Injectable()
export class ModalService {
    private _message: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translateService: TranslateService) {

    }

    get message() {
        return this._message;
    }

    showModal(message: string | Message, onValidation?: Function, onCancellation?: Function) {
        let nextMessage: any;

        if (typeof message === 'string') {
            nextMessage = this.makeNextMessage(this.translateService.instant(message), onValidation, onCancellation);
        } else {
            nextMessage = this.makeNextMessage(this.translateService.instant(message.key, message.variables), onValidation, onCancellation);
        }

        this._message.next(nextMessage);
    }

    private makeNextMessage(message: string, onValidation?: Function, onCancellation?: Function): any {
        return {
            message: message,
            onValidation: onValidation,
            onCancellation: onCancellation
        };
    }
}
