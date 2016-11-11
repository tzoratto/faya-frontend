import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../core/auth/auth.service';
import {SettingService} from '../core/setting.service';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'faya-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    isCollapsed: boolean = true;

    constructor(private authService: AuthService,
                private settingService: SettingService,
                private router: Router,
                private messageService: MessageService) {

    }

    logout(): boolean {
        this.authService.logout();
        this.router.navigate(['login'])
            .then(() => {
                this.messageService.clearAlert().addAlertAndTranslate('account.loggedOut');
            });
        return false;
    }

    ngOnInit(): void {
        this.settingService.checkSubscriptionEnabled()
            .catch(error => {});
    }
}
