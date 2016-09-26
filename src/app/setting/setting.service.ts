import {BACKEND_ROUTES} from '../backend-routes';
import {ResponseService} from '../response/response.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingService {
    private subscriptionEnabled: boolean;

    constructor(private http: Http, private responseService: ResponseService) {

    }

    checkSubscriptionEnabled(): Promise<void> {
        return this.http.get(BACKEND_ROUTES.setting.subscription)
            .toPromise()
            .then(response => {
                this.subscriptionEnabled = this.responseService.getData(response).subscriptionEnabled;
            })
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        let message = this.responseService.getErrorMessage(error);
        return Promise.reject(message || error);
    }

    getSubscriptionEnabled(): boolean {
        return this.subscriptionEnabled;
    }
}
