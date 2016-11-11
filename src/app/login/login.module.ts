import {NgModule}      from '@angular/core';
import {LoginComponent} from './login.component';
import {TranslateModule} from 'ng2-translate';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        TranslateModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}
