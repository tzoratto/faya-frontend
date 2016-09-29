import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SettingService} from '../core/setting.service';
import {TokenService} from '../token/token.service';
import {NamespaceService} from '../namespace/namespace.service';

@Injectable()
export class AdminResolve implements Resolve<any> {
    constructor(private settingService: SettingService,
                private tokenService: TokenService,
                private namespaceService: NamespaceService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
        return Promise.all([
            this.settingService.checkSubscriptionEnabled(),
            this.tokenService.getTokenCount(),
            this.namespaceService.getNamespaceCount()
        ]).then(data => {
            return {
                tokenCount: data[1],
                namespaceCount: data[2]
            };
        }).catch(error => {
            return false;
        });
    }
}
