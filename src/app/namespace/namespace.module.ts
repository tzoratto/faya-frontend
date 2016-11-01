import {NgModule}      from '@angular/core';
import {NamespaceService} from './namespace.service';
import {NamespaceListComponent} from './namespace-list.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NamespaceDetailsComponent} from './namespace-details.component';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
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
