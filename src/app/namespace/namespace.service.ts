import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import {Namespace} from './namespace';
import {HandleErrorService} from '../core/handle-error.service';

@Injectable()
export class NamespaceService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private handleErrorService: HandleErrorService) {

    }

    getNamespaceCount(user?: User): Promise<number> {
        return this.authHttp.get(BACKEND_ROUTES.api.namespace.count + (user ? '?user=' + user.id : ''))
            .toPromise()
            .then(response => {
                return this.responseService.getData(response).count;
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getNamespaces(filter = ''): Observable<Array<Namespace>> {
        return this.authHttp.get(BACKEND_ROUTES.api.namespace.namespace + '?q=' + filter)
            .map(response => {
                let namespacesRaw = this.responseService.getData(response);
                let namespaces: Array<Namespace> = [];
                namespacesRaw.forEach(namespace => {
                    namespaces.push(new Namespace(namespace));
                });
                return namespaces;
            })
            .catch(error => this.handleErrorService.handleErrorHttpObservable(error));
    }

    deleteNamespace(namespace: Namespace): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.api.namespace.instance(namespace.id))
            .toPromise()
            .then(response => {})
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    createNamespace(namespace: Namespace): Promise<Namespace> {
        let body = JSON.stringify(namespace);

        return this.authHttp.post(BACKEND_ROUTES.api.namespace.namespace, body)
            .toPromise()
            .then(response => {
                return new Namespace(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    updateNamespace(namespace: Namespace): Promise<Namespace> {
        let body = JSON.stringify(namespace);

        return this.authHttp.put(BACKEND_ROUTES.api.namespace.instance(namespace.id), body)
            .toPromise()
            .then(response => {
                return new Namespace(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }
}
