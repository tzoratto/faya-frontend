import {NgModule}      from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
