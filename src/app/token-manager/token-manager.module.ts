import {NgModule}      from '@angular/core';
import {TokenManagerComponent} from './token-manager.component';
import {NamespaceModule} from '../namespace/namespace.module';

@NgModule({
    imports: [
        NamespaceModule
    ],
    declarations: [TokenManagerComponent]
})
export class TokenManagerModule {
}
