import {BACKEND_ROUTES} from '../backend-routes';
import {ResponseService} from '../response/response.service';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private loggedIn: boolean;
    redirectUrl: string;

    constructor(private http: Http, private responseService: ResponseService) {
        this.loggedIn = !!localStorage.getItem('user');
    }

    logout(): Promise<void> {
        return this.http.get(BACKEND_ROUTES.auth.logout)
            .toPromise()
            .then(response => {
                this.loggedIn = false;
                localStorage.removeItem('user');
            })
            .catch(error => this.handleError(error));

    }

    login(email: string, password: string): Promise<void> {
        let body = JSON.stringify({'email': email, 'password': password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BACKEND_ROUTES.auth.login, body, options)
            .toPromise()
            .then(response => {
                localStorage.setItem('user', this.responseService.getData(response));
                this.loggedIn = true;
            })
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        let message = this.responseService.getErrorMessage(error);
        return Promise.reject(message || error);
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    signup(email: string, password: string): Promise<void> {
        let body = JSON.stringify({'email': email, 'password': password});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BACKEND_ROUTES.auth.signup, body, options)
            .toPromise()
            .then(() => null)
            .catch(error => this.handleError(error));
    }

    signupValidation(email: string, token: string): Promise<void> {
        return this.http.get(BACKEND_ROUTES.auth.signupValidation + '?email=' + email + '&token=' + token)
            .toPromise()
            .then((response) => {
                localStorage.setItem('user', this.responseService.getData(response));
                this.loggedIn = true;
            })
            .catch(error => this.handleError(error));
    }
}
