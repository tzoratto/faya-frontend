import {NgModule}      from '@angular/core';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {PaginationInfoComponent} from './pagination-info/pagination-info.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TimepickerModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';
import {DateTimePickerComponent} from './datetime-picker/datetime-picker.component';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        DatepickerModule,
        TimepickerModule
    ],
    declarations: [
        ToggleButtonComponent,
        PaginationInfoComponent,
        DateTimePickerComponent
    ],
    exports: [
        ToggleButtonComponent,
        PaginationInfoComponent,
        DateTimePickerComponent,
        CommonModule,
        TranslateModule,
        FormsModule
    ]
})
export class SharedModule {
}
