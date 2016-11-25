import {NgModule}      from '@angular/core';
import {NamespaceService} from './namespace.service';
import {NamespaceListComponent} from './namespace-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NamespaceDetailsComponent} from './namespace-details.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
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
