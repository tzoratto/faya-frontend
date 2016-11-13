import {NgModule}      from '@angular/core';
import {TokenService} from './token.service';
import {TranslateModule} from 'ng2-translate';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TokenListComponent} from './token-list.component';
import {CommonModule} from '@angular/common';
import {TokenDetailsComponent} from './token-details.component';
import {PaginationModule} from 'ng2-bootstrap/ng2-bootstrap';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        SharedModule
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
