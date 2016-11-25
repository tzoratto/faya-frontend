import {NgModule}      from '@angular/core';
import {TokenService} from './token.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenListComponent} from './token-list.component';
import {TokenDetailsComponent} from './token-details.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
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
