import {NgModule}      from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminGuard} from './admin-guard.service';
import {AdminResolve} from './admin-resolve.service';
import {TranslateModule} from 'ng2-translate';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        TranslateModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        AdminComponent
    ],
    providers: [
        AdminGuard,
        AdminResolve
    ]
})
export class AdminModule {
}
