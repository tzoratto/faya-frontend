import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from './response.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {AuthHttp} from 'angular2-jwt';
import {HandleErrorService} from './handle-error.service';

@Injectable()
export class SettingService {
    private subscriptionEnabled: boolean;

    constructor(private http: Http,
                private responseService: ResponseService,
                private authHttp: AuthHttp,
                private handleErrorService: HandleErrorService) {

    }

    checkSubscriptionEnabled(): Promise<boolean> {
        return this.http.get(BACKEND_ROUTES.setting.subscription)
            .toPromise()
            .then(response => {
                return this.subscriptionEnabled = this.responseService.getData(response).subscriptionEnabled;
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
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
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }
}
