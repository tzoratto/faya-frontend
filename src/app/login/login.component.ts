import {Component} from '@angular/core';

import {AuthService} from '../utils/auth/auth.service';
import {Router} from '@angular/router';
import {MessagesService} from '../utils/messages.service';
import {TranslateService} from 'ng2-translate';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService,
                private router: Router,
                private messagesService: MessagesService,
                private translateService: TranslateService) {

    }

    login(email: string, password: string): void {
        this.authService.login(email, password)
            .then(() => {
                this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard']);
                this.messagesService.clearAlert().addAlert(this.translateService.instant('account.loggedIn'));
            })
            .catch(error => {});
    }
}
