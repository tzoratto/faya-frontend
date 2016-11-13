import {NgModule}      from '@angular/core';
import {TokenManagerComponent} from './token-manager.component';
import {NamespaceModule} from '../namespace/namespace.module';
import {TokenModule} from '../token/token.module';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        NamespaceModule,
        TokenModule,
        TranslateModule
    ],
    declarations: [
        TokenManagerComponent
    ]
})
export class TokenManagerModule {
}
