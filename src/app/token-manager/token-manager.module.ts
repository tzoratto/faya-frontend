import {NgModule}      from '@angular/core';
import {TokenManagerComponent} from './token-manager.component';
import {NamespaceModule} from '../namespace/namespace.module';
import {TokenModule} from '../token/token.module';

@NgModule({
    imports: [
        NamespaceModule,
        TokenModule
    ],
    declarations: [TokenManagerComponent]
})
export class TokenManagerModule {
}
