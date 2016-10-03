import {Component, Output, EventEmitter} from '@angular/core';
import {NamespaceService} from './namespace.service';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'faya-namespace-create',
    templateUrl: 'namespace-create.component.html',
    styleUrls: ['namespace-create.component.css']
})
export class NamespaceCreateComponent {
    @Output()
    created = new EventEmitter<boolean>();

    constructor(private namespaceService: NamespaceService,
                private messageService: MessageService) {

    }

    onSubmit(name: string, description: string) {
        this.namespaceService.createNamespace(name, description)
            .then(namespace => {
                this.messageService.clearAlert().addAlertAndTranslate({
                    key: 'namespace.created',
                    variables: {namespaceName: namespace.name}
                }, 'success', 0);
                this.created.emit(true);
            })
            .catch();
    }

    onCancel() {
        this.created.emit(false);
    }
}
