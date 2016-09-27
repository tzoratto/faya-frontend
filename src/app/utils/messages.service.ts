import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Injectable()
export class MessagesService {
    public messages: Array<any> = [];

    constructor(private router: Router) {
        this.init();
    }

    public closeAlert(i: number): void {
        this.messages.splice(i, 1);
    }

    public addAlert(msg: string,
                    type: 'success'|'info'|'warning'|'danger' = 'success',
                    dismissOnTimeout = 5000,
                    dismissible = true): MessagesService {
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

    public clearAlert(): MessagesService {
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
