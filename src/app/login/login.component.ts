import {Component} from '@angular/core';

import {AuthService} from '../core/auth/auth.service';
import {Router} from '@angular/router';
import {MessageService} from '../core/message/message.service';
import {SettingService} from '../core/setting.service';

@Component({
    selector: 'faya-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService,
                private router: Router,
                private messageService: MessageService,
                private settingService: SettingService) {

    }

    onSubmit(email: string, password: string): void {
        this.authService.login(email, password)
            .then(() => {
                this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard'])
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate('account.loggedIn');
                    });
            })
            .catch(error => {});
    }
}
