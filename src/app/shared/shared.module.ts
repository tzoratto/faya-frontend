import {NgModule}      from '@angular/core';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {PaginationComponent} from './pagination/pagination.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    TimepickerModule, DatepickerModule, DropdownModule, TooltipModule,
    PaginationModule
} from 'ng2-bootstrap/ng2-bootstrap';
import {DateTimePickerComponent} from './datetime-picker/datetime-picker.component';
import {MoreButtonComponent} from './more-button/more-button.component';
import {MoreButtonRowComponent} from './more-button/more-button-row.component';
import {ClipboardDirective} from './clipboard/clipboard.directive';
import {LoadingComponent} from './loading/loading.component';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        DatepickerModule,
        TimepickerModule,
        DropdownModule,
        TooltipModule,
        PaginationModule
    ],
    declarations: [
        ToggleButtonComponent,
        PaginationComponent,
        DateTimePickerComponent,
        MoreButtonComponent,
        MoreButtonRowComponent,
        ClipboardDirective,
        LoadingComponent
    ],
    exports: [
        ToggleButtonComponent,
        PaginationComponent,
        DateTimePickerComponent,
        MoreButtonComponent,
        MoreButtonRowComponent,
        ClipboardDirective,
        LoadingComponent,
        CommonModule,
        TranslateModule,
        FormsModule,
        TooltipModule
    ]
})
export class SharedModule {
}
