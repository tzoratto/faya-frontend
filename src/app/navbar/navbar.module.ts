import {NgModule}      from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {CollapseModule} from 'ng2-bootstrap';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CollapseModule,
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    declarations: [
        NavbarComponent
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
