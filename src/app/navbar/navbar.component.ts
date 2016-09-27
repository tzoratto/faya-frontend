import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

import {AuthService} from '../auth/auth.service';
import {SettingService} from '../setting/setting.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'my-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    isCollapsed: boolean = true;
    private routerSubscription: Subscription;

    constructor(private authService: AuthService, private settingService: SettingService, private router: Router) {

    }

    logout(): boolean {
        this.authService.logout();
        this.router.navigate(['login']);
        return false;
    }

    ngOnInit(): void {
        this.routerSubscription = this.router.events.subscribe(event => {
           if (event instanceof NavigationStart) {
               this.settingService.checkSubscriptionEnabled()
                   .catch(error => {
                        alert(error);
                   });
           }
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
