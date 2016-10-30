import {NgModule}      from '@angular/core';
import {MessageService} from './message.service';
import {MessageComponent} from './message.component';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MessageComponent,
        AlertComponent
    ],
    exports: [
        MessageComponent
    ],
    providers: [
        MessageService
    ]
})
export class MessageModule {
}
