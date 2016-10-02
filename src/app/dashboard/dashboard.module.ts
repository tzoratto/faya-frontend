import {NgModule}      from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
