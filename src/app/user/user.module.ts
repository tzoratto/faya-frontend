import {NgModule}      from '@angular/core';
import {UserService} from './user.service';
import {UserListComponent} from './user-list.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule
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
