import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../core/auth/auth.service';
import {SettingService} from '../core/setting.service';
import {Subscription} from 'rxjs';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'my-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    isCollapsed: boolean = true;
    private routerSubscription: Subscription;

    constructor(private authService: AuthService,
                private settingService: SettingService,
                private router: Router,
                private messageService: MessageService) {

    }

    logout(): boolean {
        this.authService.logout();
        this.router.navigate(['login']);
        this.messageService.clearAlert().addAlertAndTranslate('account.loggedOut');
        return false;
    }

    ngOnInit(): void {
        this.settingService.checkSubscriptionEnabled()
            .catch(error => {});
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
