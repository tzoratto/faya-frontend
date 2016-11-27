import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Message} from '../../utils/message';
import {escapeHtml} from '../../utils/escape-html';

@Injectable()
export class MessageService {
    public messages: Array<any> = [];

    constructor(private router: Router, private translateService: TranslateService) {
        this.init();
    }

    public closeAlert(i: number): void {
        this.messages.splice(i, 1);
    }

    public addAlert(msg: string,
                    type: 'success'|'info'|'warning'|'danger' = 'success',
                    dismissOnTimeout = 5000,
                    dismissible = true): MessageService {
        if (!this.messages.find(message => message.msg === msg)) {
            this.messages.push({
                msg: msg,
                type: type,
                dismissible: dismissible,
                dismissOnTimeout: dismissOnTimeout
            });
        }
        return this;
    }

    public addAlertAndTranslate(msg: string | Message,
                    type: 'success'|'info'|'warning'|'danger' = 'success',
                    dismissOnTimeout = 5000,
                    dismissible = true): MessageService {
        msg = escapeHtml(msg);
        if (typeof msg === 'string') {
            this.addAlert(this.translateService.instant(msg), type, dismissOnTimeout, dismissible);
        } else {
            this.addAlert(this.translateService.instant(msg.key, msg.variables), type, dismissOnTimeout, dismissible);
        }
        return this;
    }

    public clearAlert(): MessageService {
        this.messages = [];
        return this;
    }

    private init() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.clearAlert();
            }
        });
    }
}
