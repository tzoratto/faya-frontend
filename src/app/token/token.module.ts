import {NgModule}      from '@angular/core';
import {TokenService} from './token.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenListComponent} from './token-list.component';
import {TokenDetailsComponent} from './token-details.component';
import {SharedModule} from '../shared/shared.module';
import {TokenHistoryComponent} from './token-history.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        TokenListComponent,
        TokenDetailsComponent,
        TokenHistoryComponent
    ],
    exports: [
        TokenListComponent,
        TokenDetailsComponent,
        TokenHistoryComponent
    ],
    providers: [
        TokenService
    ]
})
export class TokenModule {
}
