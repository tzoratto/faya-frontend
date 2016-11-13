import {NgModule}      from '@angular/core';
import {UserService} from './user.service';
import {UserListComponent} from './user-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ng2-bootstrap/ng2-bootstrap';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        PaginationModule,
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
