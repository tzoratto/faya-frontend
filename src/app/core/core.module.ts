import {NgModule}      from '@angular/core';
import {ResponseService} from './response.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard.service';
import {JwtHelper} from 'angular2-jwt';
import {SettingService} from './setting.service';
import {MessageComponent} from './message/message.component';
import {ModalComponent} from './modal/modal.component';
import {ModalService} from './modal/modal.service';
import {MessageService} from './message/message.service';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {ModalModule} from 'ng2-bootstrap/ng2-bootstrap';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ModalModule
    ],
    declarations: [
        MessageComponent,
        AlertComponent,
        ModalComponent
    ],
    exports: [
        MessageComponent,
        ModalComponent
    ],
    providers: [
        ResponseService,
        AuthService,
        AuthGuard,
        JwtHelper,
        SettingService,
        ModalService,
        MessageService
    ]
})
export class CoreModule {
}
