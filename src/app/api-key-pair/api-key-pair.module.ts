import {NgModule}      from '@angular/core';
import {ApiKeyPairComponent} from './api-key-pair.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {ApiKeyPairService} from './api-key-pair.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [ApiKeyPairComponent],
    providers: [
        ApiKeyPairService
    ]
})
export class ApiKeyPairModule {
}
