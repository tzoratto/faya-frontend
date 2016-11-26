import {NgModule}      from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        RouterModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
