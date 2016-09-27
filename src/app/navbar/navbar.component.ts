import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {AuthService} from '../utils/auth/auth.service';
import {SettingService} from '../setting/setting.service';
import {Subscription} from 'rxjs';
import {MessagesService} from '../utils/messages.service';

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
                private messagesService: MessagesService) {

    }

    logout(): boolean {
        this.authService.logout();
        this.router.navigate(['login']);
        this.messagesService.clearAlert().addAlertAndTranslate('account.loggedOut');
        return false;
    }

    ngOnInit(): void {
        this.routerSubscription = this.router.events.subscribe(event => {
           if (event instanceof NavigationStart) {
               this.settingService.checkSubscriptionEnabled()
                   .catch(error => {});
           }
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
