import {NgModule}      from '@angular/core';
import {MessagesService} from './messages.service';
import {ResponseService} from './response.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {JwtHelper} from 'angular2-jwt';
import {SettingService} from './setting.service';

@NgModule({
    providers: [
        MessagesService,
        ResponseService,
        AuthService,
        AuthGuard,
        JwtHelper,
        SettingService
    ]
})
export class CoreModule {
}
