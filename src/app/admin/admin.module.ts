import {NgModule}      from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminGuard} from './admin-guard.service';
import {AdminResolve} from './admin-resolve.service';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        TranslateModule
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
