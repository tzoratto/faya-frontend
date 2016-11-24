import {NgModule}      from '@angular/core';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {PaginationInfoComponent} from './pagination-info/pagination-info.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TimepickerModule, DatepickerModule, DropdownModule, TooltipModule} from 'ng2-bootstrap/ng2-bootstrap';
import {DateTimePickerComponent} from './datetime-picker/datetime-picker.component';
import {MoreButtonComponent} from './more-button/more-button.component';
import {MoreButtonRowComponent} from './more-button/more-button-row.component';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        DatepickerModule,
        TimepickerModule,
        DropdownModule,
        TooltipModule
    ],
    declarations: [
        ToggleButtonComponent,
        PaginationInfoComponent,
        DateTimePickerComponent,
        MoreButtonComponent,
        MoreButtonRowComponent
    ],
    exports: [
        ToggleButtonComponent,
        PaginationInfoComponent,
        DateTimePickerComponent,
        MoreButtonComponent,
        MoreButtonRowComponent,
        CommonModule,
        TranslateModule,
        FormsModule,
        TooltipModule
    ]
})
export class SharedModule {
}
