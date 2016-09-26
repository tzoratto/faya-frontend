import {Injectable}       from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
}                           from '@angular/router';
import {SettingService}      from './setting.service';

@Injectable()
export class SettingGuard implements CanActivate {
    constructor(private settingService: SettingService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.settingService.checkSubscriptionEnabled()
            .then(() => {
                let subscriptionEnabled = this.settingService.getSubscriptionEnabled();
                if (!subscriptionEnabled) {
                    this.router.navigate(['']);
                }
                return subscriptionEnabled;
            })
            .catch(error => {
                this.router.navigate(['']);
                return false;
            });
    }
}
