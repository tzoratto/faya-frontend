import {NgModule}      from '@angular/core';
import {NamespaceService} from './namespace.service';
import {NamespaceListComponent} from './namespace-list.component';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NamespaceCreateComponent} from './namespace-create.component';

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        NamespaceListComponent,
        NamespaceCreateComponent
    ],
    exports: [
        NamespaceListComponent,
        NamespaceCreateComponent
    ],
    providers: [
        NamespaceService
    ]
})
export class NamespaceModule {
}
