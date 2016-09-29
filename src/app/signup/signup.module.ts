import {NgModule}      from '@angular/core';
import {SignupComponent} from './signup.component';
import {SignupGuard} from './signup-guard.service';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        TranslateModule
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
