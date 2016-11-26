import {NgModule}      from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminGuard} from './admin-guard.service';
import {SharedModule} from '../shared/shared.module';
import {UserModule} from '../user/user.module';

@NgModule({
    imports: [
        SharedModule,
        UserModule
    ],
    declarations: [
        AdminComponent
    ],
    providers: [
        AdminGuard
    ]
})
export class AdminModule {
}
