import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import {CollapseModule} from 'ng2-bootstrap';
import {AlertComponent} from 'ng2-bootstrap';
import {TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ResponseService} from './utils/response.service';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthService} from './utils/auth/auth.service';
import {AuthGuard} from './utils/auth/auth-guard.service';
import {routing} from './app.routing';
import {SignupComponent} from './signup/signup.component';
import {SettingService} from './setting/setting.service';
import {SettingGuard} from './setting/setting-guard.service';
import {provideAuth, JwtHelper} from 'angular2-jwt';
import {MessagesService} from './utils/messages.service';
import {AdminComponent} from './admin/admin.component';
import {TokenService} from './token/token.service';
import {NamespaceService} from './namespace/namespace.service';
import {AdminGuard} from './admin/admin-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        CollapseModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/i18n', '.json'),
            deps: [Http]
        })
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        DashboardComponent,
        SignupComponent,
        AlertComponent,
        AdminComponent
    ],
    providers: [
        ResponseService,
        AuthService,
        AuthGuard,
        TranslateService,
        SettingService,
        SettingGuard,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'JWT',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }),
        MessagesService,
        TokenService,
        NamespaceService,
        JwtHelper,
        AdminGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
