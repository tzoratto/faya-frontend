import {NgModule}      from '@angular/core';
import {TokenService} from './token.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenListComponent} from './token-list.component';
import {TokenDetailsComponent} from './token-details.component';
import {PaginationModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        PaginationModule,
        SharedModule,
        DatepickerModule
    ],
    declarations: [
        TokenListComponent,
        TokenDetailsComponent
    ],
    exports: [
        TokenListComponent,
        TokenDetailsComponent
    ],
    providers: [
        TokenService
    ]
})
export class TokenModule {
}
