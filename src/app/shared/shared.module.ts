import {NgModule}      from '@angular/core';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {PaginationInfoComponent} from './pagination-info/pagination-info.component';
import {TranslateModule} from 'ng2-translate';

@NgModule({
    imports: [
        TranslateModule
    ],
    declarations: [
        ToggleButtonComponent,
        PaginationInfoComponent
    ],
    exports: [
        ToggleButtonComponent,
        PaginationInfoComponent
    ]
})
export class SharedModule {
}
