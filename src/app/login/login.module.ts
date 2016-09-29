import {NgModule}      from '@angular/core';
import {LoginComponent} from './login.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        TranslateModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}
