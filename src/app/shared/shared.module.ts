import {NgModule}      from '@angular/core';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {PaginationInfoComponent} from './pagination-info/pagination-info.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        ToggleButtonComponent,
        PaginationInfoComponent
    ],
    exports: [
        ToggleButtonComponent,
        PaginationInfoComponent,
        CommonModule,
        TranslateModule,
        FormsModule
    ]
})
export class SharedModule {
}
