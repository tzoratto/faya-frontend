import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../response/response.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {handleErrorHttp} from '../utils/errors';
import {MessagesService} from '../utils/messages.service';

@Injectable()
export class SettingService {
    private subscriptionEnabled: boolean;

    constructor(private http: Http,
                private responseService: ResponseService,
                private messagesService: MessagesService) {

    }

    checkSubscriptionEnabled(): Promise<void> {
        return this.http.get(BACKEND_ROUTES.setting.subscription)
            .toPromise()
            .then(response => {
                this.subscriptionEnabled = this.responseService.getData(response).subscriptionEnabled;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }

    getSubscriptionEnabled(): boolean {
        return this.subscriptionEnabled;
    }
}
