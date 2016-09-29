import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {provideAuth} from 'angular2-jwt';
import {AdminModule} from './admin/admin.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {LoginModule} from './login/login.module';
import {NamespaceModule} from './namespace/namespace.module';
import {NavbarModule} from './navbar/navbar.module';
import {SignupModule} from './signup/signup.module';
import {TokenModule} from './token/token.module';
import {CoreModule} from './core/core.module';
import {MessageModule} from './message/message.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/i18n', '.json'),
            deps: [Http]
        }),
        AdminModule,
        DashboardModule,
        LoginModule,
        NamespaceModule,
        NavbarModule,
        SignupModule,
        TokenModule,
        CoreModule,
        MessageModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
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
