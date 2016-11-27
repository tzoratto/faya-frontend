import {NgModule}      from '@angular/core';
import {SignupComponent} from './signup.component';
import {SignupGuard} from './signup-guard.service';
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
        SignupComponent
    ],
    providers: [
        SignupGuard
    ]
})
export class SignupModule {
}
