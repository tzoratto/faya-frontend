import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {handleErrorHttp} from '../utils/errors';
import {MessageService} from '../message/message.service';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../user/user';

@Injectable()
export class NamespaceService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private messageService: MessageService) {

    }

    getNamespaceCount(user?: User): Promise<number> {
        return this.authHttp.get(BACKEND_ROUTES.api.namespace.count + (user ? '?user=' + user.id : ''))
            .toPromise()
            .then(response => {
                return this.responseService.getData(response).count;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }
}
