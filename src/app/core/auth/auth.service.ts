import {BACKEND_ROUTES} from '../../utils/backend-routes';
import {ResponseService} from '../response.service';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {handleErrorHttp} from '../../utils/errors';
import {MessagesService} from '../messages.service';
import {User} from '../../user/user';

@Injectable()
export class AuthService {
    redirectUrl: string;
    private user: User;

    constructor(private http: Http,
                private responseService: ResponseService,
                private messagesService: MessagesService,
                private jwtHelper: JwtHelper) {

    }

    logout(): void {
        localStorage.removeItem('token');
        this.user = null;
    }

    private handleLoginResponse(response): void {
        let data = this.responseService.getData(response);
        localStorage.setItem('token', data);
        this.user = new User(this.jwtHelper.decodeToken(data));
    }

    login(email: string, password: string): Promise<void> {
        let body = JSON.stringify({'email': email, 'password': password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BACKEND_ROUTES.auth.login, body, options)
            .toPromise()
            .then(response => this.handleLoginResponse(response))
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }

    isLoggedIn(): boolean {
        let tokenValid = tokenNotExpired('token');
        if (!tokenValid) {
            this.user = null;
        }
        return tokenValid;
    }

    getUser(): User {
        if (!this.user && this.isLoggedIn()) {
            this.user = new User(this.jwtHelper.decodeToken(localStorage.getItem('token')));
        }
        return this.user;
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
            .then(response => this.handleLoginResponse(response))
            .catch(error => handleErrorHttp(error, this.responseService, this.messagesService));
    }
}
