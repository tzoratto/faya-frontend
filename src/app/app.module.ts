import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import {CollapseModule} from 'ng2-bootstrap';
import {TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ResponseService} from './response/response.service';
import {NavbarComponent} from './navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {routing} from './app.routing';
import {SignupComponent} from './signup/signup.component';
import {SettingService} from './setting/setting.service';
import {SettingGuard} from './setting/setting-guard.service';
import {provideAuth} from 'angular2-jwt';

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
        SignupComponent
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
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
