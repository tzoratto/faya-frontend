import {Injectable}       from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
}                           from '@angular/router';
import {SettingService}      from '../core/setting.service';

@Injectable()
export class SignupGuard implements CanActivate {
    constructor(private settingService: SettingService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.settingService.checkSubscriptionEnabled()
            .then((subscriptionEnabled) => {
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
