import {NgModule}      from '@angular/core';
import {ApiKeyPairComponent} from './api-key-pair.component';
import {ApiKeyPairService} from './api-key-pair.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [ApiKeyPairComponent],
    providers: [
        ApiKeyPairService
    ]
})
export class ApiKeyPairModule {
}
