import {NgModule}      from '@angular/core';
import {ResponseService} from './response.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {JwtHelper} from 'angular2-jwt';
import {SettingService} from './setting.service';

@NgModule({
    providers: [
        ResponseService,
        AuthService,
        AuthGuard,
        JwtHelper,
        SettingService
    ]
})
export class CoreModule {
}
