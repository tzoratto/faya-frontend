import {NgModule}      from '@angular/core';
import {TokenService} from './token.service';
import {TranslateModule} from 'ng2-translate';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TokenListComponent} from './token-list.component';
import {CommonModule} from '@angular/common';
import {TokenDetailsComponent} from './token-details.component';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
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
