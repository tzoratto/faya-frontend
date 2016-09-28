import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../utils/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {handleErrorHttp} from '../utils/errors';
import {MessagesService} from '../utils/messages.service';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class TokenService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private messagesService: MessagesService) {

    }

    getTokenCount(): Promise<number> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.count)
            .toPromise()
            .then(response => {
                return this.responseService.getData(response).count;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }
}
