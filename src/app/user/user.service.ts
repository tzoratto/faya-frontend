import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {handleErrorHttpObservable, handleErrorHttp} from '../utils/errors';
import {MessageService} from '../message/message.service';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable()
export class UserService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private messageService: MessageService) {

    }

    getUsers(filter = ''): Observable<Array<User>> {
        return this.authHttp.get(BACKEND_ROUTES.api.user.user + '?q=' + filter)
            .map(response => {
                let users: Array<User> = [];
                let data = this.responseService.getData(response);
                data.forEach(user => {
                    users.push(new User(user));
                });
                return users;
            })
            .catch(error => handleErrorHttpObservable(error, this.responseService, this.messageService));
    }

    deleteUser(user: User): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.api.user.instance(user.id))
            .toPromise()
            .then(response => {})
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }
}
