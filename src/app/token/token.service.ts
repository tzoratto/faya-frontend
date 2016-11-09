import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {handleErrorHttp} from '../utils/errors';
import {MessageService} from '../message/message.service';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import {Token} from './token';

@Injectable()
export class TokenService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private messageService: MessageService) {

    }

    getTokenCount(user?: User): Promise<number> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.count + (user ? '?user=' + user.id : ''))
            .toPromise()
            .then(response => {
                return this.responseService.getData(response).count;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
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
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }

    createToken(namespaceId: string,
                description: string,
                active: boolean,
                startsAt: Date,
                endsAt: Date,
                pool: number): Promise<Token> {
        let body = JSON.stringify({
            'namespace': namespaceId,
            'description': description,
            'active': active,
            'startsAt': startsAt,
            'endsAt': endsAt,
            'pool': pool

        });

        return this.authHttp.post(BACKEND_ROUTES.api.token.token, body)
            .toPromise()
            .then(response => {
                return new Token(this.responseService.getData(response));
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }

    deleteToken(token: Token): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.api.token.instance(token.id))
            .toPromise()
            .then(response => {})
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }

    updateToken(token: Token): Promise<Token> {
        let body = JSON.stringify({
            'description': token.description,
            'active': token.active,
            'startsAt': token.startsAt,
            'endsAt': token.endsAt,
            'pool': token.pool
        });

        return this.authHttp.put(BACKEND_ROUTES.api.token.instance(token.id), body)
            .toPromise()
            .then(response => {
                return new Token(this.responseService.getData(response));
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }
}
