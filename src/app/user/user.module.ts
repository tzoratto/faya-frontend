import {NgModule}      from '@angular/core';
import {UserService} from './user.service';
import {UserListComponent} from './user-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        UserListComponent
    ],
    exports: [
        UserListComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule {
}
