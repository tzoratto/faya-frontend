import {BACKEND_ROUTES} from '../backend-routes';
import {ResponseService} from '../response/response.service';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {tokenNotExpired} from 'angular2-jwt';
import {handleErrorHttp} from '../utils/errors';
import {MessagesService} from '../utils/messages.service';

@Injectable()
export class AuthService {
    redirectUrl: string;

    constructor(private http: Http,
                private responseService: ResponseService,
                private messagesService: MessagesService) {

    }

    logout(): void {
        localStorage.removeItem('token');
    }

    login(email: string, password: string): Promise<void> {
        let body = JSON.stringify({'email': email, 'password': password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BACKEND_ROUTES.auth.login, body, options)
            .toPromise()
            .then(response => {
                localStorage.setItem('token', this.responseService.getData(response));
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }

    isLoggedIn(): boolean {
        return tokenNotExpired('token');
    }

    signup(email: string, password: string): Promise<void> {
        let body = JSON.stringify({'email': email, 'password': password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BACKEND_ROUTES.auth.signup, body, options)
            .toPromise()
            .then(() => null)
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }

    signupValidation(email: string, token: string): Promise<void> {
        return this.http.get(BACKEND_ROUTES.auth.signupValidation + '?email=' + email + '&token=' + token)
            .toPromise()
            .then((response) => {
                localStorage.setItem('token', this.responseService.getData(response));
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }
}
