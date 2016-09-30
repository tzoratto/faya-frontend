import {NgModule}      from '@angular/core';
import {LoginComponent} from './login.component';
import {TranslateModule} from 'ng2-translate';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        TranslateModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {
}
