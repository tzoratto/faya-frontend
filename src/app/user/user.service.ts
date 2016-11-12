import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs';
import {User} from './user';
import {HandleErrorService} from '../core/handle-error.service';
import {PaginatedResult} from '../utils/paginated-result';
import {PaginationParameter} from '../utils/pagination-parameter';

@Injectable()
export class UserService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private handleErrorService: HandleErrorService) {

    }

    getUsers(paginationParameter: PaginationParameter): Observable<PaginatedResult<User>> {
        return this.authHttp.get(BACKEND_ROUTES.api.user.user + paginationParameter.buildQueryString())
            .map(response => {
                return new PaginatedResult<User>(this.responseService.getData(response), User);
            })
            .catch(error => this.handleErrorService.handleErrorHttpObservable(error));
    }

    deleteUser(user: User): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.api.user.instance(user.id))
            .toPromise()
            .then(response => {})
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }
}
