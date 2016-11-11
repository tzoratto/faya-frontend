import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from './response.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {handleErrorHttp} from '../utils/errors';
import {AuthHttp} from 'angular2-jwt';
import {MessageService} from './message/message.service';

@Injectable()
export class SettingService {
    private subscriptionEnabled: boolean;

    constructor(private http: Http,
                private responseService: ResponseService,
                private messageService: MessageService,
                private authHttp: AuthHttp) {

    }

    checkSubscriptionEnabled(): Promise<boolean> {
        return this.http.get(BACKEND_ROUTES.setting.subscription)
            .toPromise()
            .then(response => {
                return this.subscriptionEnabled = this.responseService.getData(response).subscriptionEnabled;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }

    getSubscriptionEnabled(): boolean {
        return this.subscriptionEnabled;
    }

    updateSubscriptionEnabled(value: boolean): Promise<void> {
        let body = JSON.stringify({'subscriptionEnabled': value});

        return this.authHttp.put(BACKEND_ROUTES.setting.subscription, body)
            .toPromise()
            .then(response => {
                this.subscriptionEnabled = value;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }
}
