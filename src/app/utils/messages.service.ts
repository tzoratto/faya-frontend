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
                    type: 'success' | 'info' | 'warning' | 'danger' = 'success',
                    dismissible = true,
                    dismissOnTimeout = 0): void {
        if (!this.messages.find(message => message.msg === msg)) {
            this.messages.push({
                msg: msg,
                type: type,
                dismissible: dismissible,
                dismissOnTimeout: dismissOnTimeout
            });
        }
    }

    public clearAlert() {
        this.messages = [];
    }

    private init() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.clearAlert();
            }
        });
    }
}
