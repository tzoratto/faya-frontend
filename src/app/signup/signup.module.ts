import {NgModule}      from '@angular/core';
import {SignupComponent} from './signup.component';
import {SignupGuard} from './signup-guard.service';
import {TranslateModule} from 'ng2-translate';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        TranslateModule,
        FormsModule
    ],
    declarations: [
        SignupComponent
    ],
    providers: [
        SignupGuard
    ]
})
export class SignupModule {
}
