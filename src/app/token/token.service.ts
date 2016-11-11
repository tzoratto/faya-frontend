import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import {Token} from './token';
import {HandleErrorService} from '../core/handle-error.service';

@Injectable()
export class TokenService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private handleErrorService: HandleErrorService) {

    }

    getTokenCount(user?: User): Promise<number> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.count + (user ? '?user=' + user.id : ''))
            .toPromise()
            .then(response => {
                return this.responseService.getData(response).count;
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getTokens(filter = '', namespaceId = ''): Observable<Array<Token>> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.token + '?q=' + filter + '&namespace=' + namespaceId)
            .map(response => {
                let tokensRaw = this.responseService.getData(response);
                let tokens: Array<Token> = [];
                tokensRaw.forEach(token => {
                    tokens.push(new Token(token));
                });
                return tokens;
            })
            .catch(error => this.handleErrorService.handleErrorHttpObservable(error));
    }

    createToken(token: Token): Promise<Token> {
        let body = JSON.stringify(token);

        return this.authHttp.post(BACKEND_ROUTES.api.token.token, body)
            .toPromise()
            .then(response => {
                return new Token(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    deleteToken(token: Token): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.api.token.instance(token.id))
            .toPromise()
            .then(response => {})
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    updateToken(token: Token): Promise<Token> {
        let body = JSON.stringify(token);

        return this.authHttp.put(BACKEND_ROUTES.api.token.instance(token.id), body)
            .toPromise()
            .then(response => {
                return new Token(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }
}
