import {NgModule}      from '@angular/core';
import {ToggleButtonComponent} from './toggle-button/toggle-button.component';
import {PaginationComponent} from './pagination/pagination.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    TimepickerModule, DatepickerModule, TooltipModule,
    PaginationModule
} from 'ng2-bootstrap/ng2-bootstrap';
import {DateTimePickerComponent} from './datetime-picker/datetime-picker.component';
import {MoreButtonComponent} from './more-button/more-button.component';
import {MoreButtonRowComponent} from './more-button/more-button-row.component';
import {ClipboardDirective} from './clipboard/clipboard.directive';
import {LoadingComponent} from './loading/loading.component';
import {ChartDirective} from './chart/chart.directive';
import {ChartService} from './chart/chart.service';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        DatepickerModule,
        TimepickerModule,
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
        LoadingComponent,
        ChartDirective
    ],
    exports: [
        ToggleButtonComponent,
        PaginationComponent,
        DateTimePickerComponent,
        MoreButtonComponent,
        MoreButtonRowComponent,
        ClipboardDirective,
        LoadingComponent,
        ChartDirective,
        CommonModule,
        TranslateModule,
        FormsModule,
        TooltipModule
    ],
    providers: [
        ChartService,
        DatePipe
    ]
})
export class SharedModule {
}
