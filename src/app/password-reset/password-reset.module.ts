import {NgModule}      from '@angular/core';
import {TranslateModule} from 'ng2-translate';
import {FormsModule} from '@angular/forms';
import {PasswordResetComponent} from './password-reset.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        PasswordResetComponent
    ]
})
export class PasswordResetModule {
}
