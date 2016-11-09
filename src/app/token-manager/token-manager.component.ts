import {Component} from '@angular/core';
import {Namespace} from '../namespace/namespace';

@Component({
    selector: 'faya-token-manager',
    templateUrl: 'token-manager.component.html',
    styleUrls: ['token-manager.component.css']
})
export class TokenManagerComponent {
    private namespaceSelected: Namespace;

    constructor() {

    }

    onNamespaceSelected(namespace: Namespace): void {
        this.namespaceSelected = namespace;
    }
}
