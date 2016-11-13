import {NgModule}      from '@angular/core';
import {NamespaceService} from './namespace.service';
import {NamespaceListComponent} from './namespace-list.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NamespaceDetailsComponent} from './namespace-details.component';
import {PaginationModule} from 'ng2-bootstrap/ng2-bootstrap';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaginationModule,
        SharedModule
    ],
    declarations: [
        NamespaceListComponent,
        NamespaceDetailsComponent
    ],
    exports: [
        NamespaceListComponent,
        NamespaceDetailsComponent
    ],
    providers: [
        NamespaceService
    ]
})
export class NamespaceModule {
}
