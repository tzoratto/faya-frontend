import {NgModule}      from '@angular/core';
import {ModalComponent} from './modal.component';
import {ModalModule as BootstrapModalModule} from 'ng2-bootstrap';
import {ModalService} from './modal.service';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        BootstrapModalModule,
        TranslateModule
    ],
    declarations: [
        ModalComponent
    ],
    exports: [
        ModalComponent
    ],
    providers: [
        ModalService
    ]
})
export class ModalModule {
}
